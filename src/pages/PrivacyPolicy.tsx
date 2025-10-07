import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p>
                At Éclat — Lingerie Fine, we collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Account credentials</li>
                <li>Purchase history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our products, services, and customer experience</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
                <li>Personalize your shopping experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Service providers who assist in our operations (shipping, payment processing, marketing)</li>
                <li>Law enforcement or regulatory authorities when required by law</li>
                <li>Business partners for joint marketing initiatives (only with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings, though some features of our site may not function properly if you disable cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain types of processing</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us at:
              </p>
              <p className="mt-4">
                Email: privacy@eclat-lingerie.com<br />
                Or visit our Contact page
              </p>
            </section>

            <p className="text-sm mt-12 pt-8 border-t border-border">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}