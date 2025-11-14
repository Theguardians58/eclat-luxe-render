const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8">
            Shipping & Returns
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Shipping Information</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Domestic Shipping (United States)</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Standard Shipping - FREE on orders over $200</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Delivery: 5-7 business days</li>
                    <li>• Cost: $8.99 for orders under $200</li>
                    <li>• Tracking included</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">Express Shipping</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Delivery: 2-3 business days</li>
                    <li>• Cost: $19.99</li>
                    <li>• Tracking and signature required</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">Overnight Shipping</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Delivery: Next business day</li>
                    <li>• Cost: $34.99</li>
                    <li>• Must be ordered before 2 PM EST</li>
                    <li>• Tracking and signature required</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">International Shipping</h3>
              <p className="text-muted-foreground mb-4">
                We ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination.
              </p>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Standard International</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Delivery: 7-14 business days</li>
                    <li>• Cost: Calculated at checkout based on destination and weight</li>
                    <li>• Tracking included</li>
                    <li>• Customer responsible for customs fees and import taxes</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">Express International</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Delivery: 3-5 business days</li>
                    <li>• Cost: Calculated at checkout</li>
                    <li>• Expedited customs clearance</li>
                    <li>• Full tracking and insurance included</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Order Processing</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Orders placed before 2 PM EST ship the same business day</li>
                <li>• Orders placed after 2 PM EST ship the next business day</li>
                <li>• We do not ship on weekends or major holidays</li>
                <li>• You'll receive a confirmation email with tracking information once your order ships</li>
                <li>• Processing time: 1-2 business days for all orders</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Packaging</h2>
              <p className="text-muted-foreground">
                All orders are shipped in discreet, unmarked packaging to protect your privacy. Your items will arrive in eco-friendly packaging materials whenever possible, reflecting our commitment to sustainability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Returns Policy</h2>
              <p className="text-muted-foreground mb-4">
                We want you to love your purchase! If you're not completely satisfied, we accept returns within 30 days of delivery.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Return Eligibility</h3>
              <p className="text-muted-foreground mb-4">To be eligible for a return, items must meet the following criteria:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Unworn and unwashed</li>
                <li>• Original tags still attached</li>
                <li>• Original packaging included</li>
                <li>• Hygienic liner must be intact and in place</li>
                <li>• Returned within 30 days of delivery</li>
                <li>• No signs of wear, damage, or alterations</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Non-Returnable Items</h3>
              <p className="text-muted-foreground mb-4">For hygiene and safety reasons, the following items cannot be returned:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Items without original tags or hygienic liner</li>
                <li>• Worn, washed, or altered items</li>
                <li>• Sale or clearance items (marked as final sale)</li>
                <li>• Gift cards</li>
                <li>• Items purchased from unauthorized retailers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How to Return</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Step 1: Initiate Your Return</p>
                  <p>Log into your account and navigate to "Order History." Select the order you wish to return and click "Start Return."</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">Step 2: Print Return Label</p>
                  <p>You'll receive a prepaid return shipping label via email within 24 hours. Print this label and attach it to your package.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">Step 3: Pack Your Items</p>
                  <p>Securely pack your items in the original packaging (if available) or a suitable box. Include all original tags and packaging materials.</p>
                </div>
                
                <div>
                  <p className="font-medium text-foreground">Step 4: Ship Your Return</p>
                  <p>Drop off your package at any authorized shipping location. We recommend obtaining a receipt for your records.</p>
                </div>
              </div>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Return Shipping Costs</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Domestic returns: $8.99 (deducted from your refund)</li>
                <li>• FREE return shipping on exchanges</li>
                <li>• FREE return shipping if item is defective or incorrect</li>
                <li>• International returns: Customer responsible for return shipping costs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Exchanges</h2>
              <p className="text-muted-foreground mb-4">
                Need a different size or color? We offer FREE exchanges within 30 days of delivery. Follow the same return process and indicate you'd like an exchange. We'll ship your new item as soon as we receive your return.
              </p>
              <p className="text-muted-foreground">
                <strong>Note:</strong> If your desired size or color is out of stock, we'll process a full refund instead.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Refunds</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Refunds are processed within 5-7 business days of receiving your return</li>
                <li>• Refunds are issued to the original payment method</li>
                <li>• You'll receive an email confirmation once your refund is processed</li>
                <li>• Bank processing times may vary (typically 3-10 business days)</li>
                <li>• Original shipping costs are non-refundable (unless item is defective)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Damaged or Defective Items</h2>
              <p className="text-muted-foreground mb-4">
                We carefully inspect all items before shipping, but if you receive a damaged or defective item, please contact us immediately at support@example.com with photos of the issue. We'll arrange a free replacement or full refund, including return shipping costs.
              </p>
              <p className="text-muted-foreground">
                Claims for damaged or defective items must be made within 7 days of delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Lost or Stolen Packages</h2>
              <p className="text-muted-foreground mb-4">
                We're not responsible for packages marked as delivered by the carrier. If your tracking shows delivered but you haven't received your package:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Check with neighbors or building management</li>
                <li>• Look for delivery notices or alternate delivery locations</li>
                <li>• Contact the shipping carrier to open an investigation</li>
                <li>• If the carrier confirms the package is lost, contact us for assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Questions?</h2>
              <p className="text-muted-foreground">
                If you have any questions about shipping or returns, please contact our customer service team at support@example.com or call 1-800-XXX-XXXX (Monday-Friday, 9 AM - 6 PM EST). We're here to help!
              </p>
            </section>
          </div>
        </div>
      </div>
  );
};

export default ShippingReturns;
