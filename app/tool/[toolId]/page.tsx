import { createClient } from "@/lib/supabase/server";
import ToolClient from "./components/ToolClient";

const ToolPage = async ({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) => {
  const { toolId } = await params;
  const supabase = await createClient();

  // Fetch tool data with customer details using a join
  const { data: tool, error } = await supabase
    .from("tool_rack_layout")
    .select(
      `
      *,
      customer:customers(
        id,
        customer_name,
        customer_logo
      )
    `
    )
    .eq("id", toolId)
    .single();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-red-600 text-xl font-semibold">
            Error loading tool
          </h2>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-yellow-600 text-xl font-semibold">
            Tool not found
          </h2>
          <p className="text-yellow-500">
            The requested tool could not be found.
          </p>
        </div>
      </div>
    );
  }

  return <ToolClient tool={tool} />;
};

export default ToolPage;
