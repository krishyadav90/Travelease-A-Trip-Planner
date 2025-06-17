
import { DollarSign, Calendar } from "lucide-react";
import ShareDestination from "@/components/ShareDestination";
import SaveButton from "./SaveButton";

interface DestinationInfoBarProps {
  destination: {
    id: string;
    name: string;
    average_cost?: number;
    best_seasons?: string[];
  };
  usingFallback?: boolean;
}

const DestinationInfoBar = ({ destination, usingFallback }: DestinationInfoBarProps) => {
  return (
    <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-8 border border-gray-200 dark:border-gray-700/50">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="text-gray-500 dark:text-gray-400 mr-1">Avg cost:</span>
              ₹{destination.average_cost?.toLocaleString() || 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
               <span className="font-medium text-gray-700 dark:text-gray-300 mr-1">Best season:</span>
              {destination.best_seasons?.slice(0, 3).join(", ") || 'N/A'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!usingFallback && <SaveButton destinationId={destination.id} />}
          <ShareDestination 
            destinationName={destination.name}
            destinationId={destination.id}
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationInfoBar;
