import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import MainHeader from "@/components/common/main-header";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Toys",
  "Sports",
  "Automotive",
  "Groceries",
];

const features = [
  {
    title: "For Buyers",
    description:
      "Shop from thousands of products across hundreds of trusted vendors. Enjoy secure payments, fast delivery, and 24/7 support.",
    icon: "🛒",
  },
  {
    title: "For Sellers",
    description:
      "Grow your business with powerful analytics, easy product uploads, and a large customer base. Instant payouts and low fees.",
    icon: "💼",
  },
  {
    title: "Secure & Trusted",
    description:
      "Your data and transactions are protected with industry-leading security. Shop and sell with confidence.",
    icon: "🔒",
  },
];

const stats = [
  { label: "Vendors", value: 1200 },
  { label: "Products", value: 35000 },
  { label: "Orders Delivered", value: 500000 },
  { label: "Active Users", value: 80000 },
];

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Buyer",
    quote:
      "I love the variety and the fast shipping! This is my go-to marketplace.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mohammed Ali",
    role: "Vendor",
    quote:
      "The seller dashboard is powerful and easy to use. My sales have doubled!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Singh",
    role: "Buyer",
    quote: "Great deals and amazing customer support. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const faqs = [
  {
    q: "How do I become a vendor?",
    a: "Click on 'Start Selling' and complete the registration. Our team will review and approve your store within 24 hours.",
  },
  {
    q: "Is my payment information safe?",
    a: "Absolutely. We use industry-standard encryption and never store your payment details.",
  },
  {
    q: "How fast is delivery?",
    a: "Most orders are delivered within 2-5 business days, depending on your location and the vendor.",
  },
  {
    q: "Can I return products?",
    a: "Yes, we offer easy returns within 14 days for most products. Check the product page for details.",
  },
];

// Demo products (from seller products page)
const demoProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    sku: "TS-001",
    price: 100,
    stock: 200,
    status: "Active",
    category: "Men's Clothing",
  },
  {
    id: 2,
    name: "Leather Wallet",
    sku: "WL-002",
    price: 50,
    stock: 200,
    status: "Active",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    sku: "EB-003",
    price: 70,
    stock: 12,
    status: "Low Stock",
    category: "Headphones & Audio",
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Mug",
    sku: "MG-004",
    price: 60,
    stock: 32,
    status: "Active",
    category: "Kitchen & Dining",
  },
  {
    id: 5,
    name: "Organic Face Cream",
    sku: "MG-004",
    price: 200,
    stock: 0,
    status: "Out of Stock",
    category: "Skincare",
  },
  {
    id: 6,
    name: "Bamboo Cutting Board",
    sku: "CB-006",
    price: 620,
    stock: 5,
    status: "Low Stock",
    category: "Kitchen & Dining",
  },
  {
    id: 7,
    name: "Smart Watch",
    sku: "SW-007",
    price: 299,
    stock: 15,
    status: "Active",
    category: "Wearables",
  },
  {
    id: 8,
    name: "Gaming Mouse",
    sku: "GM-008",
    price: 45,
    stock: 25,
    status: "Active",
    category: "Laptops & Accessories",
  },
];

export default function Home() {
  return (
    <main className="bg-white text-black min-h-screen w-full">
      {/* Main Section */}
      <MainHeader />

      <div className="flex-1 min-w-0">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-black">The Ultimate </span>
            <span className="text-red-600">Multi-Vendor</span>
            <span className="text-black"> Marketplace</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
            Discover, shop, and sell from thousands of products and trusted
            vendors. Experience seamless shopping and powerful selling tools—all
            in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/all-products">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12 text-lg font-semibold rounded-md shadow-lg">
                Start Shopping
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-red-600 hover:text-white px-8 h-12 text-lg font-semibold rounded-md"
              >
                Become a Vendor
              </Button>
            </Link>
          </div>
          {/* Hero Carousel */}
          <div className="w-full max-w-3xl mt-12">
            <Carousel>
              <CarouselContent>
                {[1, 2, 3].map((i) => (
                  <CarouselItem key={i} className="p-2">
                    <Card className="bg-gray-100 border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-xl text-red-600">
                          Featured Product {i}
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                          Top-rated item from our best vendors
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center text-5xl text-red-600">
                          🛍️
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <Card key={f.title} className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span className="text-red-600 text-3xl">{f.icon}</span>{" "}
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {f.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <Badge
                key={cat}
                className="bg-white rounded-full text-red-600 border-red-600 px-6 py-3 text-lg font-semibold"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">
                Featured Products
              </h2>
              <Link href="/all-products">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md">
                  View All Products
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {demoProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border-gray-200 flex flex-col py-0"
                >
                  <div className="w-full h-40 bg-gray-100 rounded-t-lg flex items-center justify-center p-4">
                    <Image
                      src="https://pngimg.com/uploads/box/box_PNG41.png"
                      alt={product.name}
                      width={640}
                      height={640}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                  <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-gray-900">
                        {product.name}
                      </h3>
                      <div className="text-gray-500 text-sm mb-2">
                        SKU: {product.sku}
                      </div>
                      <div className="text-xl font-bold text-red-600 mb-2">
                        ${product.price}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={
                          product.status === "Active"
                            ? "text-green-600 bg-green-100 border border-green-200 px-2 py-1 rounded text-xs"
                            : product.status === "Low Stock"
                            ? "text-orange-600 bg-orange-100 border border-orange-200 px-2 py-1 rounded text-xs"
                            : "text-red-600 bg-red-100 border border-red-200 px-2 py-1 rounded text-xs"
                        }
                      >
                        {product.status}
                      </span>
                      <span className="text-gray-400 text-xs">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            How It Works
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                desc: "Create your free account as a buyer or vendor.",
              },
              {
                step: 2,
                title: "Browse & List",
                desc: "Buyers explore products. Vendors list items easily.",
              },
              {
                step: 3,
                title: "Order & Sell",
                desc: "Buyers order securely. Vendors manage sales effortlessly.",
              },
              {
                step: 4,
                title: "Fast Delivery & Payouts",
                desc: "Enjoy quick shipping and instant vendor payouts.",
              },
            ].map((s) => (
              <Card
                key={s.step}
                className="bg-white border-gray-200 flex flex-col items-center text-center"
              >
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4">
                  {s.step}
                </div>
                <CardTitle className="text-lg mb-2">{s.title}</CardTitle>
                <CardDescription className="text-gray-500 px-4">
                  {s.desc}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-4xl font-extrabold text-red-600 mb-2">
                  {stat.value.toLocaleString()}
                </span>
                <span className="text-lg text-gray-700">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            What Our Users Say
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card
                key={t.name}
                className="bg-white border-gray-200 flex flex-col items-center text-center"
              >
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src={t.img} alt={t.name} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <CardContent>
                  <p className="text-gray-700 italic mb-2">
                    &quot;{t.quote}&quout;
                  </p>
                  <span className="text-red-600 font-semibold">{t.name}</span>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={"faq-" + i}>
                  <AccordionTrigger className="text-lg text-red-600">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 py-8 px-4 mt-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-lg font-bold text-black">Marketplace</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-red-600 transition">
                Home
              </a>
              <a href="#" className="hover:text-red-600 transition">
                Shop
              </a>
              <a href="#" className="hover:text-red-600 transition">
                Sell
              </a>
              <a href="#" className="hover:text-red-600 transition">
                Contact
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-red-600 transition"
              >
                🐦
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-red-600 transition"
              >
                📘
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-red-600 transition"
              >
                📸
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}
