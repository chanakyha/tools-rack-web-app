import { createClient } from "@/lib/supabase/server";
import ClientTools from "./client";

async function getCustomerTools(customerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tool_rack_layout")
    .select(
      `*,
      customer:customers(
        id,
        customer_name,
        customer_logo
      )`
    )
    .eq("customer_id", customerId);

  if (error) {
    console.error("Error fetching tools:", error);
    return [];
  }

  return data;
}

const CustomerTools = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const { customerId } = await params;
  const tools = await getCustomerTools(customerId);

  return <ClientTools tools={tools} />;
};

export default CustomerTools;
