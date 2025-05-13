

import React from "react";
import { Badge } from "@/components/ui/badge";

const TemplateCard = ({ title, image, isPaid, onClick }) => {
  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-76 object-cover"
      />
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge variant={isPaid ? "destructive" : "default"}>
          {isPaid ? "Paid" : "Free"}
        </Badge>
      </div>
    </div>
  );
};

export default TemplateCard;
