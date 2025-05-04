"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 text-blue-900 p-4">
      {/* Background overlay with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-blue-100"
      />

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full max-w-xl"
      >
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Image
                src="/fine-components.png"
                alt="Fine Components and Tools Pvt. Ltd."
                width={280}
                height={60}
                className="mx-auto"
              />
            </motion.div>
          </CardHeader>
          <CardContent className="grid gap-6">
            {/* Title with staggered animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-3xl font-bold text-center max-w-md mx-auto leading-relaxed text-blue-900"
            >
              Welcome to Fine Components and Tools
            </motion.h1>

            {/* Buttons with hover animation */}
            <div className="flex flex-col gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12"
                >
                  <Link href="/listings">Start</Link>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
