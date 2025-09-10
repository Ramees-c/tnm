import React from "react";

function SubscriptionFeatureList({ features }) {
  return (
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="text-gray-700">
          ✅ {feature}
        </li>
      ))}
    </ul>
  );
}

export default SubscriptionFeatureList;
