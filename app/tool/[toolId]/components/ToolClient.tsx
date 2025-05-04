"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RackLayout } from "./RackLayout";
import Image from "next/image";
import Link from "next/link";

interface ToolData {
  id: string;
  name: string;
  description?: string;
  location: string;
  category?: string;
  status?: "available" | "in_use" | "maintenance";
  last_maintained?: string;
  image_url?: string;
  tool_no: string;
  wo_no: string;
  rack_no: string;
  customer: {
    id: string;
    customer_name: string;
    customer_logo: string;
  };
}

interface ToolClientProps {
  tool: ToolData;
}

const ToolClient = ({ tool }: ToolClientProps) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  console.log(tool);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16"
    >
      {/* Background effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"
      />

      <Container>
        <motion.div variants={headerVariants} className="text-center mb-8">
          {tool.customer?.customer_logo && (
            <div className="relative w-32 p-2 rounded-md bg-white mx-auto mb-6">
              <Link href={`/tools/${tool.customer.id}`}>
                <Image
                  src={tool.customer.customer_logo}
                  alt={`${tool.customer.customer_name} logo`}
                  width={1920}
                  height={1080}
                  className="object-contain"
                />
              </Link>
            </div>
          )}
          <h1 className="text-4xl font-bold text-white mb-4">Tool Details</h1>
          <p className="text-blue-100 text-lg">
            Tool #{tool.tool_no} | Work Order: {tool.wo_no}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Tool Details Card */}
          <motion.div
            variants={cardVariants}
            className="md:sticky md:top-5 h-fit"
          >
            <Card className="border-none bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-blue-900">
                    Tool Information
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Details
                    </h3>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Tool Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {tool.tool_no}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Work Order
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {tool.wo_no}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Rack Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {tool.rack_no}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {tool.location}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Customer
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {tool.customer?.customer_name}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {tool.last_maintained && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Maintenance
                      </h3>
                      <p className="text-sm text-gray-600">
                        Last maintained on{" "}
                        {new Date(tool.last_maintained).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {tool.description && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Description
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tool.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rack Layout Card */}
          <motion.div variants={cardVariants}>
            <Card className="border-none bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <h2 className="text-2xl font-semibold text-blue-900">
                  Tool Location
                </h2>
              </CardHeader>
              <CardContent>
                <RackLayout currentLocation={tool.rack_no} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default ToolClient;
