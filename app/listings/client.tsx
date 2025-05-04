"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import Link from "next/link";
interface Customer {
  id: number;
  customer_name: string;
  customer_logo: string;
}

interface ClientListingsProps {
  customers: Customer[];
}

const ClientListings = ({ customers }: ClientListingsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -15,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        delay: index * 0.1,
      },
    }),
    hover: {
      scale: 1.02,
      rotateX: 2,
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: 0.1,
      },
    },
  };

  const backgroundVariants = {
    hidden: {
      opacity: 0,
      scale: 0.99,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const textVariants = {
    hover: {
      y: -1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={backgroundVariants}
      className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center pointer-events-none"
      />

      <Container className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div variants={headerVariants} className="text-center mb-16">
          <motion.h1
            className="text-4xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Choose your customer
          </motion.h1>
          <motion.p
            className="text-blue-100 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Select a customer to view their dedicated portal and resources
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000"
        >
          {customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover="hover"
              className="h-full cursor-pointer"
            >
              <Link href={`/tools/${customer.id}`}>
                <Card className="h-full border-none bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors duration-300">
                  <CardHeader className="space-y-0 pb-4">
                    <motion.div
                      variants={imageVariants}
                      className="h-28 flex items-center justify-center p-4"
                    >
                      <Image
                        src={customer.customer_logo}
                        alt={customer.customer_name}
                        width={240}
                        height={96}
                        className="object-contain max-h-full"
                        priority={index < 6}
                      />
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={textVariants}
                      className="space-y-2 text-center"
                    >
                      <h2 className="text-xl font-bold text-blue-950">
                        {customer.customer_name}
                      </h2>
                      <p className="text-sm text-blue-600">
                        Click to access portal
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default ClientListings;
