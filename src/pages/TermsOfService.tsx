import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using Éclat — Lingerie Fine's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials on Éclat's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software on our website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Product Information</h2>
              <p>
                We strive to ensure that all product descriptions, images, and pricing information are accurate. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product is not as described, your sole remedy is to return it in unused condition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Pricing and Payment</h2>
              <p>
                All prices are in the currency specified on the website and are subject to change without notice. We accept various payment methods as indicated at checkout. Payment must be received in full before your order is dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Orders and Fulfillment</h2>
              <p>
                We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase, inaccuracies in product or pricing information, or problems identified by our fraud detection systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Returns and Refunds</h2>
              <p>
                Due to the intimate nature of our products, we maintain strict hygiene standards. Items must be unworn, unwashed, and in their original packaging with all tags attached to be eligible for return. Please refer to our Returns Policy for detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
              <p>
                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Éclat — Lingerie Fine and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall Éclat — Lingerie Fine or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website, even if we have been notified of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through our Contact page or email us at legal@eclat-lingerie.com.
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