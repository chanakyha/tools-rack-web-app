"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ClientToolsProps {
  tools: {
    id: string;
    tool_no: string;
    wo_no: string;
    rack_no: string;
    location: string;
    customer: {
      customer_name: string;
      customer_logo: string;
    };
  }[];
}

type FilterOption = "all" | "tool_no" | "wo_no" | "rack_no" | "location";

// Simplified display for the card
const SimpleRackNumber = ({ rackNo }: { rackNo: string }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-medium">
      <span>Rack</span>
      <span className="font-bold">{rackNo}</span>
    </div>
  );
};

const ClientTools = ({ tools }: ClientToolsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  console.log(tools);

  // Filter tools based on search query and filter option
  const filteredTools = tools.filter((tool) => {
    const searchTerm = searchQuery.toLowerCase();

    if (filterOption === "all") {
      return (
        tool.tool_no.toLowerCase().includes(searchTerm) ||
        tool.wo_no.toLowerCase().includes(searchTerm) ||
        tool.rack_no.toLowerCase().includes(searchTerm) ||
        tool.location.toLowerCase().includes(searchTerm)
      );
    }

    return tool[filterOption].toLowerCase().includes(searchTerm);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const toolCardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      },
    },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const filterOptions = [
    { value: "all", label: "All Fields" },
    { value: "tool_no", label: "Tool Number" },
    { value: "wo_no", label: "Work Order" },
    { value: "rack_no", label: "Rack Number" },
    { value: "location", label: "Location" },
  ];

  const getPlaceholderText = () => {
    if (filterOption === "all") return "Search across all fields...";
    return `Search by ${
      filterOptions.find((opt) => opt.value === filterOption)?.label
    }...`;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16"
    >
      <Container>
        <div>
          {tools.length > 0 && tools[0].customer && (
            <div className="flex flex-col items-center justify-center mb-8">
              {tools[0].customer.customer_logo && (
                <div className="relative w-32  p-2 rounded-md bg-white mx-auto mb-4">
                  <Image
                    src={tools[0].customer.customer_logo}
                    alt={`${tools[0].customer.customer_name} logo`}
                    width={1920}
                    height={1080}
                    className="object-contain"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold text-white">
                {tools[0].customer.customer_name}
              </h2>
            </div>
          )}
        </div>
        <motion.div variants={headerVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Tool Inventory</h1>
          <p className="text-blue-100 text-lg">
            Manage and track your tools efficiently
          </p>
        </motion.div>

        {/* Search Bar with Filter */}
        <motion.div
          variants={searchBarVariants}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </div>
              <Input
                type="text"
                placeholder={getPlaceholderText()}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/95 backdrop-blur-sm border-none 
                  shadow-lg h-11 transition-all duration-300
                  placeholder:text-gray-400 focus-visible:ring-2 
                  focus-visible:ring-blue-400 focus-visible:ring-offset-0
                  hover:bg-white/100 hover:shadow-xl"
              />
            </div>

            <Select
              value={filterOption}
              onValueChange={(value: FilterOption) => setFilterOption(value)}
            >
              <SelectTrigger
                className="w-[180px] bg-white/95 backdrop-blur-sm border-none 
                  shadow-lg h-11 transition-all duration-300
                  focus:ring-2 focus:ring-blue-400 focus:ring-offset-0
                  hover:bg-white/100 hover:shadow-xl
                  data-[placeholder]:text-gray-400 text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select filter" />
                </div>
              </SelectTrigger>
              <SelectContent
                className="bg-white/95 backdrop-blur-sm border-none shadow-lg
                  animate-in fade-in-0 zoom-in-95"
              >
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer transition-colors duration-200
                      hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-600
                      data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTools.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-8"
            >
              <p className="text-white text-lg">
                No tools found matching your search criteria
              </p>
            </motion.div>
          ) : (
            filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                custom={index}
                variants={toolCardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Link href={`/tool/${tool.id}`}>
                  <Card className="h-full border-none bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-blue-900">
                          Tool #{tool.tool_no}
                        </h2>
                        <SimpleRackNumber rackNo={tool.rack_no} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Work Order:</span>
                          <span className="font-medium">{tool.wo_no}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{tool.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default ClientTools;
