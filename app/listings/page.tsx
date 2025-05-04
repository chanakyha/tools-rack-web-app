import { createClient } from "@/lib/supabase/server";
import ClientListings from "./client";

async function getCustomers() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    console.error("Error fetching customers:", error);
    return [];
  }

  return data;
}

export default async function ListingsPage() {
  const customers = await getCustomers();

  return <ClientListings customers={customers} />;
}
