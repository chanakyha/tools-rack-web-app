interface Customer {
  id: number;
  customer_name: string;
  customer_logo: string;
}

interface Tool {
  id: number;
  customer_id: number;
  wo_no: string;
  tool_no: string;
  rack_no: string;
  location: string;
}
