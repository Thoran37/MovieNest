import { CheckCircle } from "lucide-react"; // Lucide-react for icons
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LastPage() {
  let navigate = useNavigate();

  function gotoHome() {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      {/* Success Icon */}
      <div className="flex items-center justify-center mb-8">
        <CheckCircle className="text-green-500 animate-bounce h-24 w-24" />
      </div>

      {/* Success Message */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4 animate-pulse">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your purchase. Your transaction was completed
          successfully.
        </p>

        {/* Back to Home Button */}
        <Button
          variant="outline"
          className="hover:bg-green-500 hover:text-white transition-all duration-300"
          onClick={gotoHome}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
