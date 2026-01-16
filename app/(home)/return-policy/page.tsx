import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Return Policy for Dr. Jomo Cousins - Information about returning purchases and refunds.",
  robots: {
    index: false,
  },
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#3d3d3d] mb-4">Return Policy</h1>
        <p className="text-gray-600 mb-8">
          Last Updated: { new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At the Jomo And Charmaine Cousins Foundation, we stand behind the quality of our products
              and want you to be satisfied with your purchase. Please carefully review this Return Policy
              before making a purchase.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>All sales are final</strong> unless the item you received is defective, damaged, or incorrect.
              We do not accept returns for change of mind, buyer's remorse, or other non-defect related reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Physical Products - Books and Merchandise</h2>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">All Sales Final</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All physical products, including books, apparel, and other merchandise, are sold on a final sale basis.
              We do not accept returns or offer refunds for items that you simply change your mind about or no longer want.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>We strongly encourage you to:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Carefully review product descriptions, sizes, and specifications before ordering</li>
              <li>Contact us with any questions before completing your purchase</li>
              <li>Ensure your shipping address is correct at checkout</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Defective, Damaged, or Incorrect Items</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will accept returns and provide refunds or replacements <strong>only</strong> if:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Your item arrived damaged during shipping</li>
              <li>Your item is defective or has manufacturing defects</li>
              <li>You received the wrong item due to our fulfillment error</li>
              <li>Your item is missing parts or components that should have been included</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Reporting Defective or Damaged Items</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you receive a defective, damaged, or incorrect item, you must contact us within <strong>7 days of delivery</strong>.
              Please follow these steps:
            </p>
            <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
              <li>Contact us immediately at <a href="mailto:support@pastorjomo.com" className="text-[#e31e24] hover:underline">support@pastorjomo.com</a> or call <a href="tel:8136712009" className="text-[#e31e24] hover:underline">(813) 671-2009</a></li>
              <li>Provide your order number and a detailed description of the issue</li>
              <li>Include clear photos showing the defect, damage, or incorrect item</li>
              <li>Include photos of the packaging if the item was damaged in transit</li>
              <li>Do not discard the item or packaging until we provide instructions</li>
            </ol>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important:</strong> Claims made after 7 days from delivery may not be accepted.
              We cannot replace or refund items if the issue is not reported within this timeframe.
            </p>

            <h3 className="text-xl font-semibold text-[#3d3d3d] mb-3">Return Process for Approved Claims</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If your claim is approved, we will provide return authorization and instructions. At our discretion,
              we may offer:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>A full refund to your original payment method</li>
              <li>A replacement item shipped at no additional cost</li>
              <li>Store credit for a future purchase</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              For approved returns due to defects, damage, or our error, we will provide a prepaid return
              shipping label. You will not be charged for return shipping in these cases.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Refund Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once we receive and inspect your approved return, we will notify you by email of the outcome.
              If your refund is approved, it will be processed within 5-10 business days to your original
              payment method.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Please note that the time it takes for the refund to appear in your account depends on your
              bank or credit card issuer's processing time, which is beyond our control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Digital Products</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>All sales of digital products are final.</strong> Due to the nature of digital content,
              we cannot accept returns or offer refunds for digital products including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>E-books and digital books</li>
              <li>Audio recordings and podcasts</li>
              <li>Video content and recorded teachings</li>
              <li>Digital downloads of any kind</li>
              <li>Online courses and training materials</li>
              <li>Downloadable resources and worksheets</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once access has been granted or a download has been initiated, the sale is considered complete
              and cannot be reversed.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Technical Support:</strong> If you experience technical difficulties accessing your digital
              purchase within 7 days of purchase (such as broken download links, corrupted files, or access issues),
              please contact us at <a href="mailto:support@pastorjomo.com" className="text-[#e31e24] hover:underline">support@pastorjomo.com</a>.
              We will work to resolve technical issues, but this does not constitute a refund policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Subscriptions and Recurring Payments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For subscription-based products or services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>You may cancel your subscription at any time through your Stripe receipts or by contacting us</li>
              <li>Cancellations will take effect at the end of the current billing period</li>
              <li>No refunds will be provided for partial billing periods</li>
              <li>You will retain access to subscription content until the end of your paid period</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Speaking Engagements, Events, and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For speaking engagements, conferences, counseling sessions, and other service bookings:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>All deposits and booking fees are non-refundable</strong></li>
              <li>Payment for services constitutes a commitment and holds the scheduled date/time</li>
              <li>Cancellation policies are outlined in individual booking agreements and contracts</li>
              <li>Rescheduling may be available depending on circumstances and availability</li>
              <li>Last-minute cancellations may result in forfeiture of all payments</li>
              <li>Please refer to your specific booking contract for detailed terms and conditions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We recommend reviewing your booking agreement carefully before committing to any service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">What Is Not Covered</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We cannot accept returns or provide refunds for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Change of mind or buyer's remorse</li>
              <li>Items you no longer want or need</li>
              <li>Items that don't meet your personal expectations (when they match the product description)</li>
              <li>Items purchased for the wrong person or as the wrong gift</li>
              <li>Incorrect size selection (unless we provided inaccurate sizing information)</li>
              <li>Items that have been used, read, worn, or opened beyond initial inspection</li>
              <li>Digital products after access has been granted (see Digital Products section)</li>
              <li>Items damaged after delivery due to misuse or normal wear</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Questions and Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about our Return Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <a href="mailto:support@pastorjomo.com" className="text-[#e31e24] hover:underline">support@pastorjomo.com</a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> <a href="tel:8136712009" className="text-[#e31e24] hover:underline">(813) 671-2009</a>
              </p>
              <p className="text-gray-700">
                <strong>Alternative Email:</strong> <a href="mailto:bookjomocousins@gmail.com" className="text-[#e31e24] hover:underline">bookjomocousins@gmail.com</a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update or modify this Return Policy at any time. Changes will be
              effective immediately upon posting to our website. We encourage you to review this policy
              before each purchase.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            <strong>Last Updated:</strong> { new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }
          </p>
          <p className="text-sm text-gray-600 italic">
            By making a purchase from the Jomo And Charmaine Cousins Foundation, you acknowledge that you
            have read, understood, and agree to be bound by this Return Policy. Please review this policy
            carefully before completing your purchase, as all sales are final except for defective, damaged,
            or incorrect items.
          </p>
        </div>
      </div>
    </div>
  );
}
