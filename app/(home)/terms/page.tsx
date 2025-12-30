import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dr. Jomo Cousins",
  description: "Terms of Service for Dr. Jomo Cousins - Rules and guidelines for using our website and services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#3d3d3d] mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: { new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Dr. Jomo Cousins ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website at www.jomocousins.com (the "Site"), including any content, functionality, and services offered on or through the Site.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Site after such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">2. Use of the Site</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Permitted Use</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may use the Site for lawful purposes only and in accordance with these Terms. You agree not to use the Site:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Site, or which may harm the Company or users of the Site</li>
              <li>To introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</li>
              <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site</li>
              <li>To attack the Site via a denial-of-service attack or a distributed denial-of-service attack</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">User Accounts</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features of the Site, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">3. Products and Services</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Product Descriptions</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to provide accurate descriptions and images of our products. However, we do not warrant that product descriptions, images, or other content on the Site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition within our return policy timeframe.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Pricing and Availability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All prices are subject to change without notice. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Limit the quantity of items purchased per person, household, or order</li>
              <li>Refuse or cancel any orders</li>
              <li>Discontinue any product at any time</li>
              <li>Correct pricing errors on our Site</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              In the event of a pricing error, we will contact you to inform you of the error and give you the option to continue your purchase at the correct price or cancel your order.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Payment and Billing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment is processed securely through Stripe. By making a purchase, you agree to provide current, complete, and accurate payment information. You authorize us to charge your payment method for the total amount of your order, including any applicable taxes and shipping fees.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Shipping and Delivery</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We ship physical products to addresses in the United States and Canada. Shipping times are estimates only and may vary. We are not responsible for delays caused by shipping carriers or customs. Title and risk of loss pass to you upon delivery to the shipping carrier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">4. Returns and Refunds</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Physical Products</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We accept returns of physical products within 30 days of delivery, subject to the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Items must be unused and in their original packaging</li>
              <li>Items must be returned in resalable condition</li>
              <li>You must contact us to initiate a return and receive return authorization</li>
              <li>Return shipping costs are the responsibility of the customer unless the item is defective or we made an error</li>
              <li>Refunds will be issued to the original payment method within 5-10 business days of receiving the returned item</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Digital Products and Subscriptions</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Due to the nature of digital products and online courses, all sales are final once access has been granted. However, if you experience technical issues preventing you from accessing your purchase, please contact us within 7 days and we will work to resolve the issue or provide a refund.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Subscription services may be cancelled at any time. Cancellations will take effect at the end of the current billing period. No refunds will be provided for partial subscription periods.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Speaking Engagements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Deposits for speaking engagements are non-refundable. Cancellation policies will be outlined in individual booking agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">5. Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Our Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, sermons, prayer videos, books, courses, and the design, selection, and arrangement thereof) are owned by Dr. Jomo Cousins, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
              <li>You may print or download one copy of a reasonable number of pages of the Site for your own personal, non-commercial use</li>
              <li>Digital products you have purchased may be used in accordance with the license granted at the time of purchase</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Trademarks</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Company name, logos, and all related names, logos, product and service names, designs, and slogans are trademarks of the Company or its affiliates or licensors. You must not use such marks without our prior written permission.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">User-Generated Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you submit prayer requests, testimonials, comments, or other content to the Site ("User Content"), you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You represent and warrant that you own or control all rights in and to your User Content and that such content does not violate these Terms or any applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">6. Prayer Requests and Spiritual Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Prayer requests submitted through the Site are treated as confidential and will be handled with care and respect. However, we cannot guarantee absolute confidentiality as prayers may be shared within our ministry team.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The spiritual guidance, prayer resources, and ministry services provided through this Site are not a substitute for professional medical, mental health, or legal advice. If you are experiencing a crisis or emergency, please contact appropriate emergency services immediately.
            </p>
            <p className="text-gray-700 leading-relaxed">
              While we believe in the power of prayer and strive to provide meaningful spiritual support, we make no guarantees or warranties regarding specific outcomes or results from prayer ministry.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">7. Third-Party Links and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">8. Disclaimers and Limitation of Liability</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Disclaimer of Warranties</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE SITE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>The Site will function uninterrupted, secure, or available at any particular time or location</li>
              <li>Any errors or defects will be corrected</li>
              <li>The Site is free of viruses or other harmful components</li>
              <li>The results of using the Site will meet your requirements</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE, INCLUDING:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Direct, indirect, special, incidental, consequential, or punitive damages</li>
              <li>Personal injury, pain and suffering, emotional distress, or loss of revenue</li>
              <li>Loss of profits, data, or other intangible losses</li>
              <li>Damages resulting from unauthorized access or alteration of your data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW. IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
            </p>
            <p className="text-gray-700 leading-relaxed">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT YOU PAID TO US IN THE SIX (6) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE LIABILITY, OR $100, WHICHEVER IS GREATER.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">9. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">10. Governing Law and Dispute Resolution</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Governing Law</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms and any dispute or claim arising out of or related to these Terms or their subject matter shall be governed by and construed in accordance with the laws of the State of Florida, without giving effect to any choice or conflict of law provision or rule.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Dispute Resolution</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in Tampa, Florida, and you irrevocably consent to personal jurisdiction and venue in such courts.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Informal Resolution</h3>
            <p className="text-gray-700 leading-relaxed">
              Before initiating any legal action, you agree to first contact us and attempt to resolve the dispute informally by sending written notice to{ ' ' }
              <a href="mailto:bookjomocousins@gmail.com" className="text-[#e31e24] hover:underline">
                bookjomocousins@gmail.com
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">11. Severability and Waiver</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Severability</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Waiver</h3>
            <p className="text-gray-700 leading-relaxed">
              No waiver by the Company of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">12. Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the sole and entire agreement between you and Dr. Jomo Cousins regarding the Site and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">13. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your access to the Site immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your right to use the Site will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Dr. Jomo Cousins Ministries</strong></p>
              <p className="text-gray-700 mb-2">Email: <a href="mailto:bookjomocousins@gmail.com" className="text-[#e31e24] hover:underline">bookjomocousins@gmail.com</a></p>
              <p className="text-gray-700 mb-2">Phone: <a href="tel:+18136712009" className="text-[#e31e24] hover:underline">(813) 671-2009</a></p>
              <p className="text-gray-700">Website: <a href="https://www.jomocousins.com" className="text-[#e31e24] hover:underline">www.jomocousins.com</a></p>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 italic">
            These Terms of Service were last updated on { new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }. By continuing to use our Site after changes are posted, you accept the updated Terms.
          </p>
        </div>
      </div>
    </div>
  );
}
