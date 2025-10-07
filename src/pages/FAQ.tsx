import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping typically takes 5-7 business days within the continental US. Express shipping (2-3 business days) and international shipping are also available at checkout. You'll receive a tracking number via email once your order ships."
      },
      {
        q: "Do you offer international shipping?",
        a: "Yes! We ship to over 50 countries worldwide. International shipping times vary by destination, typically ranging from 7-14 business days. Customs fees and import taxes may apply depending on your country."
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and viewing your order history."
      },
      {
        q: "What if my order is delayed?",
        a: "If your order is delayed beyond the expected delivery window, please contact our customer service team at support@eclat-lingerie.com. We'll investigate and provide you with an update as soon as possible."
      }
    ]
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery for unworn, unwashed items with all original tags attached. Due to hygiene reasons, we cannot accept returns on items that have been worn or washed. Visit our Returns page for detailed instructions."
      },
      {
        q: "How do I initiate a return or exchange?",
        a: "Log into your account, go to your order history, and select 'Request Return/Exchange' for the item you wish to return. Follow the prompts to print your prepaid return label (for US customers) or return instructions (for international customers)."
      },
      {
        q: "How long does it take to process a refund?",
        a: "Once we receive your return, we'll inspect it and process your refund within 5-7 business days. The refund will be credited to your original payment method. Please allow an additional 5-10 business days for the refund to appear in your account."
      },
      {
        q: "Can I exchange an item for a different size or color?",
        a: "Yes! During the return process, you can select 'Exchange' and choose your preferred size or color. We'll ship your exchange item as soon as we receive your return."
      }
    ]
  },
  {
    title: "Sizing & Fit",
    questions: [
      {
        q: "How do I find my perfect size?",
        a: "We recommend using our comprehensive Size Guide, which includes detailed measurements and fitting tips for each product category. You can also take our quick Size Quiz for personalized recommendations."
      },
      {
        q: "What if I'm between sizes?",
        a: "If you're between sizes, we generally recommend sizing up for comfort, especially for bras and bralettes. Each product page includes specific fit notes and customer reviews to help guide your decision."
      },
      {
        q: "Do your sizes run true to size?",
        a: "Yes, our products are designed to run true to size based on standard measurements. However, fit can vary slightly between styles. Always check the product-specific size guide and customer reviews for additional insights."
      },
      {
        q: "Can I get help with sizing?",
        a: "Of course! Our customer service team is available to provide personalized sizing assistance. Contact us via email, phone, or live chat, and we'll help you find your perfect fit."
      }
    ]
  },
  {
    title: "Products & Care",
    questions: [
      {
        q: "What materials are your products made from?",
        a: "We use premium, sustainable materials including organic cotton, bamboo, silk, and recycled fabrics. Each product page lists the specific materials and their percentages. All our materials are certified and ethically sourced."
      },
      {
        q: "How should I care for my lingerie?",
        a: "For longevity, we recommend hand washing in cool water with mild detergent and laying flat to dry. Delicate items should be placed in a mesh laundry bag if machine washing. Avoid bleach, fabric softeners, and high heat. Detailed care instructions are included with each item."
      },
      {
        q: "Are your products sustainable?",
        a: "Yes! Sustainability is at the core of our brand. We use eco-friendly materials, ethical production practices, and recyclable packaging. Learn more on our Sustainability page."
      },
      {
        q: "Do you restock sold-out items?",
        a: "Popular items are typically restocked within 4-6 weeks. Sign up for restock notifications on any sold-out product page to be notified when it's available again."
      }
    ]
  },
  {
    title: "Account & Payment",
    questions: [
      {
        q: "Do I need an account to place an order?",
        a: "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, access exclusive offers, and enjoy a faster checkout experience."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through encrypted channels."
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers."
      },
      {
        q: "Can I use multiple discount codes?",
        a: "Only one discount code can be applied per order. If you have multiple codes, choose the one that provides the best discount for your purchase."
      }
    ]
  }
];

export default function FAQ() {
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Everything you need to know about Éclat products, orders, and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                  {category.title}
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="border border-border rounded-lg px-6 bg-background"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <span className="text-foreground font-medium pr-4">
                          {item.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-subtle to-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <MessageCircle className="h-16 w-16 text-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our customer service team is here to help. We typically respond within 24 hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">
              Email: support@eclat-lingerie.com • Phone: 1-800-ECLAT-00
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}