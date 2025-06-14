import { Badge } from "../ui/badge";

export const StatusBadge = ({ status }: any) => {
  // const getStatusVariant = (status) => {
  //   switch (status) {
  //     case "Pending":
  //       return "secondary";
  //     case "Shipped":
  //       return "default";
  //     case "Delivered":
  //       return "default";
  //     case "Cancelled":
  //       return "destructive";
  //     case "Processing":
  //       return "secondary";
  //     default:
  //       return "outline";
  //   }
  // };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {status}
    </Badge>
  );
};
