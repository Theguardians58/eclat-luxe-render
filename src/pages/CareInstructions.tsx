const CareInstructions = () => {
  return (
    <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8">
            Care Instructions
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">General Care Guidelines</h2>
              <p className="text-muted-foreground">
                Proper care is essential to maintain the beauty and longevity of your lingerie. Following these guidelines will help preserve the delicate fabrics, lace details, and structural integrity of your pieces.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Washing Instructions</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Hand Washing (Recommended)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fill a clean sink or basin with cool water (30°C/86°F or below)</li>
                <li>• Add a small amount of gentle, pH-neutral detergent specifically designed for delicates</li>
                <li>• Submerge items and gently swish through the water for 2-3 minutes</li>
                <li>• Avoid twisting, wringing, or pulling the fabric</li>
                <li>• Rinse thoroughly in cool water until all soap residue is removed</li>
                <li>• Gently press out excess water - never wring or twist</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Machine Washing (When Necessary)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Always use a mesh lingerie bag to protect delicate items</li>
                <li>• Select the delicate or hand-wash cycle</li>
                <li>• Use cool water (30°C/86°F maximum)</li>
                <li>• Hook all closures before washing to prevent snagging</li>
                <li>• Wash similar colors together</li>
                <li>• Remove items immediately after the cycle completes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Drying Instructions</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Lay flat on a clean, dry towel away from direct sunlight</li>
                <li>• Reshape cups and adjust straps while damp</li>
                <li>• Never use a tumble dryer - heat damages elastic and breaks down fabrics</li>
                <li>• Avoid hanging wet bras by straps as this can cause stretching</li>
                <li>• Do not expose to radiators or direct heat sources</li>
                <li>• Allow items to dry completely before storing (typically 24 hours)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What to Avoid</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bleach or chlorine-based products (damages fabric and causes discoloration)</li>
                <li>• Fabric softeners (breaks down elastic fibers)</li>
                <li>• Hot water (causes shrinkage and color fading)</li>
                <li>• Ironing (heat damages delicate materials)</li>
                <li>• Dry cleaning (harsh chemicals can damage fine fabrics)</li>
                <li>• Leaving items wet or damp for extended periods (promotes bacterial growth)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Storage Tips</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Store bras with cups nested inside each other to maintain shape</li>
                <li>• Never fold molded or padded cups in half</li>
                <li>• Keep items in a cool, dry drawer away from direct sunlight</li>
                <li>• Allow lingerie to rest between wears (alternate your pieces)</li>
                <li>• Store delicate lace items flat or loosely folded</li>
                <li>• Use drawer dividers to keep items organized and prevent tangling</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Fabric-Specific Care</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Silk</h3>
              <p className="text-muted-foreground">
                Use a specialized silk detergent. Wash in cool water and avoid direct sunlight when drying to prevent color fading.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Lace</h3>
              <p className="text-muted-foreground">
                Extra gentle handling required. Always hand wash in a mesh bag if machine washing. Lay flat to dry to prevent stretching.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Cotton</h3>
              <p className="text-muted-foreground">
                More durable but still benefits from gentle care. Can withstand slightly warmer water but avoid hot temperatures.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Modal/Bamboo</h3>
              <p className="text-muted-foreground">
                Highly absorbent - requires thorough drying. Prone to pilling if rubbed excessively when wet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">When to Replace</h2>
              <p className="text-muted-foreground mb-4">
                Even with proper care, lingerie has a lifespan. Consider replacing items when you notice:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Loss of elasticity in bands or straps</li>
                <li>• Visible wear, pilling, or thinning fabric</li>
                <li>• Permanent staining or discoloration</li>
                <li>• Underwires poking through fabric</li>
                <li>• Changes in fit despite no body changes</li>
                <li>• Stretched-out cups that no longer provide support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Need More Help?</h2>
              <p className="text-muted-foreground">
                If you have specific questions about caring for a particular item, please don't hesitate to contact our customer care team. Each piece you purchase includes a care label with specific instructions for that garment.
              </p>
            </section>
          </div>
        </div>
      </div>
  );
};

export default CareInstructions;
