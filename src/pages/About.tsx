import { Heart, Award, Sparkles, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Every piece is designed with passion and attention to detail, ensuring the perfect blend of comfort and elegance.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source the finest materials from around the world to create lingerie that feels as luxurious as it looks.',
    },
    {
      icon: Sparkles,
      title: 'Timeless Design',
      description: 'Our collections blend classic sophistication with modern sensibility, creating pieces that transcend trends.',
    },
    {
      icon: Shield,
      title: 'Sustainable Luxury',
      description: 'Committed to ethical production and sustainable practices, because beauty should never come at a cost to our planet.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'Founded', description: 'Éclat was born from a vision to redefine intimate apparel' },
    { year: '2019', title: 'First Collection', description: 'Launched our debut collection to critical acclaim' },
    { year: '2021', title: 'Global Expansion', description: 'Expanded to serve customers in over 30 countries' },
    { year: '2023', title: 'Sustainability Initiative', description: 'Launched our eco-friendly production line' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif text-foreground mb-6">
            About Éclat
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Where elegance meets intimacy. We craft exquisite lingerie that celebrates the beauty,
            confidence, and individuality of every woman.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Éclat was founded with a simple yet powerful belief: that intimate apparel should be
              more than just functional—it should be a celebration of femininity, confidence, and
              self-expression. Our journey began in a small Parisian atelier, where our founder,
              inspired by the delicate artistry of vintage lingerie, set out to create pieces that
              would make every woman feel extraordinary.
            </p>
            <p>
              Today, Éclat has grown into a globally recognized brand, but our commitment remains
              unchanged. Each piece in our collection is thoughtfully designed and meticulously
              crafted using the finest materials. From delicate French lace to Italian silk, we
              source only the best to ensure that our lingerie feels as luxurious as it looks.
            </p>
            <p>
              We believe that true beauty lies in the details, and every stitch, every seam, every
              embellishment is placed with intention. Our designs are timeless yet contemporary,
              classic yet daring—a perfect reflection of the modern woman who wears them.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-serif text-primary font-semibold">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative flex-grow pb-8">
                  {index < milestones.length - 1 && (
                    <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="relative">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary" />
                    <div className="pl-8">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-foreground mb-6">Our Commitment to You</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Éclat, we're committed to providing not just beautiful lingerie, but an exceptional
            experience. From our personalized size consultations to our carefully curated collections,
            every aspect of our service is designed with you in mind. We're honored to be part of your
            journey to feeling confident, beautiful, and authentically yourself.
          </p>
        </div>
      </section>
    </div>
  );
}
