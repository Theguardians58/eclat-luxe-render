import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, TrendingUp, Users, Globe, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs"
  },
  {
    icon: TrendingUp,
    title: "Growth & Development",
    description: "Professional development budget, mentorship programs, and career advancement opportunities"
  },
  {
    icon: Users,
    title: "Work-Life Balance",
    description: "Flexible working hours, remote work options, and generous time-off policies"
  },
  {
    icon: Globe,
    title: "Global Culture",
    description: "Diverse, inclusive team from around the world with opportunities for international collaboration"
  },
  {
    icon: Sparkles,
    title: "Employee Perks",
    description: "Product discounts, team events, and a beautiful workspace designed for creativity"
  },
  {
    icon: Briefcase,
    title: "Competitive Compensation",
    description: "Market-leading salaries, performance bonuses, and equity participation"
  }
];

const openPositions = [
  {
    title: "Senior Product Designer",
    department: "Design",
    location: "Paris, France / Remote",
    type: "Full-time"
  },
  {
    title: "E-commerce Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "Sustainability Coordinator",
    department: "Operations",
    location: "Milan, Italy",
    type: "Full-time"
  },
  {
    title: "Customer Experience Specialist",
    department: "Customer Service",
    location: "London, UK / Remote",
    type: "Full-time"
  },
  {
    title: "Frontend Developer",
    department: "Technology",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "Content Creator (Social Media)",
    department: "Marketing",
    location: "New York, USA / Remote",
    type: "Full-time"
  }
];

export default function Careers() {
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
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Help us redefine intimate elegance while building a career you'll love
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
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
              Why Éclat?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At Éclat, we're more than a lingerie brand—we're a community of passionate individuals committed to excellence, sustainability, and empowerment. We believe that our people are our greatest asset, and we invest in creating an environment where everyone can thrive.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our culture is built on creativity, collaboration, and inclusivity. We celebrate diverse perspectives and encourage innovation at every level. Whether you're designing the next collection, optimizing our supply chain, or delighting our customers, your work directly impacts our mission to make every person feel confident and beautiful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center">
            Our Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-8 rounded-lg border border-border hover:border-primary/20 transition-colors"
              >
                <benefit.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center">
              Open Positions
            </h2>
            
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background border border-border rounded-lg p-6 hover:border-primary/20 transition-all hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {position.location}
                        </span>
                        <span className="px-3 py-1 bg-subtle rounded-full">
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="whitespace-nowrap">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-subtle to-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're always looking for talented individuals who share our passion. Send us your CV and tell us how you'd like to contribute to Éclat's mission.
            </p>
            <Button size="lg" className="px-8">
              Send Your Application
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Email us at careers@eclat-lingerie.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            Éclat — Lingerie Fine is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. All qualified applicants will receive consideration for employment without regard to race, color, religion, gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
          </p>
        </div>
      </section>
    </div>
  );
}