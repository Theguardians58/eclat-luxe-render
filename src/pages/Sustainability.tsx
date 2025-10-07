import { motion } from "framer-motion";
import { Leaf, Heart, Recycle, Users, Globe, Award } from "lucide-react";

const sustainabilityPillars = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "We source the finest organic cotton, bamboo, and recycled fabrics from certified suppliers who share our commitment to environmental responsibility."
  },
  {
    icon: Heart,
    title: "Ethical Production",
    description: "Every piece is crafted in facilities that ensure fair wages, safe working conditions, and respect for workers' rights. We maintain long-term partnerships with our manufacturers."
  },
  {
    icon: Recycle,
    title: "Circular Fashion",
    description: "Our recycling program accepts pre-loved Éclat items, giving them new life while reducing textile waste. We also use recyclable and biodegradable packaging."
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "We invest in education and empowerment programs in our production communities, supporting artisan skills and local economic development."
  },
  {
    icon: Globe,
    title: "Carbon Neutrality",
    description: "We're committed to achieving carbon neutrality by 2026 through renewable energy, efficient logistics, and verified carbon offset programs."
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Our products carry GOTS, OEKO-TEX, and Fair Trade certifications, ensuring the highest standards of sustainability and ethics."
  }
];

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-subtle to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              Our Commitment to Sustainability
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Elegance should never come at the cost of our planet. At Éclat, luxury and sustainability go hand in hand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              Our Sustainability Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We believe that true luxury lies in creating beautiful pieces that respect both the people who make them and the planet we share. Our sustainability journey is woven into every aspect of our business—from material sourcing to packaging, from production to community engagement.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're continuously evolving our practices, setting ambitious goals, and holding ourselves accountable to the highest environmental and ethical standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Pillars */}
      <section className="py-16 md:py-20 bg-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sustainabilityPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-8 rounded-lg border border-border hover:border-primary/20 transition-colors"
              >
                <pillar.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress & Goals */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
              Our Progress & Future Goals
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-2 border-primary pl-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">2024 Achievements</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>✓ 85% of our collection now uses sustainable materials</li>
                  <li>✓ Eliminated single-use plastics from all packaging</li>
                  <li>✓ Achieved B Corp certification</li>
                  <li>✓ Launched our garment recycling program in 15 countries</li>
                </ul>
              </div>

              <div className="border-l-2 border-primary/50 pl-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">2025 Goals</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>→ 100% sustainable materials across entire collection</li>
                  <li>→ Reduce carbon footprint by 40%</li>
                  <li>→ Implement blockchain for supply chain transparency</li>
                  <li>→ Expand recycling program to 30 countries</li>
                </ul>
              </div>

              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">2026 Vision</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>→ Achieve complete carbon neutrality</li>
                  <li>→ Launch circular fashion marketplace</li>
                  <li>→ Water-positive production processes</li>
                  <li>→ Establish sustainability education fund</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-subtle to-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Sustainability is a collective effort. Every purchase you make supports ethical production, sustainable materials, and a healthier planet. Together, we're creating a more beautiful future.
            </p>
            <p className="text-muted-foreground">
              Have questions about our sustainability practices? <br />
              <a href="/contact" className="text-primary hover:underline">Contact us</a> – we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}