import React from "react";
import { formatDate } from "../Utils/Functions.jsx";
import PersonalIcon from "../Assets/SVG/personal.svg";
import CommlIcon from "../Assets/SVG/comment.svg";

// ✅ safer phone formatter
const formatPhoneForDisplay = (phone) => {
  if (!phone) return "N/A";

  const parts = phone.split(";");
  const num = parts[1] || parts[0] || "";

  return num.startsWith("0") ? num : `0${num}`;
};

const Carousel = ({ pinnedNotifs, index }) => {
  return (
    <div className="overflow-hidden relative w-full h-full z-0">
      <div
        className="inline-flex transition ease-out duration-300"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${pinnedNotifs.length * 100}%`,
        }}
      >
        {pinnedNotifs.map((pin, mapIndex) => {
          // ✅ Enhanced logging for debugging
          console.log("🔎 Carousel pin:", pin);
          console.log("🔎 pin.gen raw value:", pin.gen);
          console.log("🔎 pin.gen type:", typeof pin.gen);
          console.log("🔎 pin.gen === null:", pin.gen === null);
          console.log("🔎 pin.gen === undefined:", pin.gen === undefined);
          console.log("🔎 pin.gen length (if string):", typeof pin.gen === 'string' ? pin.gen.length : 'N/A');
          console.log("🔎 pin.gen JSON.stringify:", JSON.stringify(pin.gen));
          
          // Check if gen property exists in the pin object
          console.log("🔎 'gen' property exists:", 'gen' in pin);
          console.log("🔎 Object.keys(pin):", Object.keys(pin));

          let parsedGen = null;
          
          // Enhanced gen parsing with better error handling
          if (pin.gen !== null && pin.gen !== undefined && pin.gen !== '') {
            try {
              // Check if it's already an object
              if (typeof pin.gen === 'object' && pin.gen !== null) {
                parsedGen = pin.gen;
                console.log("✅ Gen is already an object:", parsedGen);
              } else if (typeof pin.gen === 'string' && pin.gen.trim() !== '') {
                console.log("🔄 Attempting to parse string:", pin.gen);
                // Try to parse as JSON string
                parsedGen = JSON.parse(pin.gen.trim());
                console.log("✅ Parsed gen from string:", parsedGen);
              } else {
                console.warn("⚠️ pin.gen is not a valid string or object:", pin.gen);
              }
            } catch (err) {
              console.error("❌ Failed to parse gen:", pin.gen, "Error:", err.message);
              // Try alternative parsing if the string format is different
              try {
                // Handle case where it might be a malformed JSON
                let cleanedGen = pin.gen.toString().replace(/'/g, '"'); // Replace single quotes with double quotes
                console.log("🔄 Trying cleaned gen:", cleanedGen);
                parsedGen = JSON.parse(cleanedGen);
                console.log("✅ Parsed gen after cleaning:", parsedGen);
              } catch (err2) {
                console.error("❌ Failed to parse gen even after cleaning:", err2.message);
                parsedGen = null;
              }
            }
          } else {
            console.warn("⚠️ pin.gen is missing, null, undefined, or empty string");
          }

          // Additional check to ensure parsedGen has valid content
          if (parsedGen && Object.keys(parsedGen).length === 0) {
            console.warn("⚠️ parsedGen is empty object");
            parsedGen = null;
          }

          return (
            <div
              key={mapIndex}
              className="flex flex-col justify-start items-start w-full h-full"
              style={{ flex: "0 0 100%" }}
            >
              <span className="text-textSecoundary text-sm mb-2">
                {formatDate(new Date() - pin.timestamp)}
              </span>

              {/* Personal info */}
              <div className="flex items-start space-x-2 mt-2">
                <img
                  src={PersonalIcon}
                  alt="dashboard icon"
                  className="w-15 h-15 mt-1"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {`${pin.firstname} ${pin.lastname}`}
                  </span>
                  <span className="font-medium text-sm">
                    {formatPhoneForDisplay(pin.phoneNumber)}
                  </span>
                </div>
              </div>

              {/* Liste Génériques */}
              <div className="w-full mt-4">
                
                <div className="flex flex-col mt-2 space-y-1">
                  {parsedGen && Object.keys(parsedGen).length > 0 ? (
                    Object.entries(parsedGen).map(([key, value]) => (
                      <div
                        key={`med-gen-${key}`}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-textPrimary">
                          Médicament {parseInt(key) + 1}:
                        </span>
                        <span
                          className={`font-semibold ${
                            value ? "text-grey-900" : "text-grey-900"
                          }`}
                        >
                          {value ? "Générique" : "Non générique"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-textSecoundary italic">
                      Tous les médicaments sont disponibles.
                    </span>
                  )}
                </div>
              </div>

              {/* Commentaire */}
              <div className="flex items-start space-x-2 mt-4">
                <img
                  src={CommlIcon}
                  alt="comment icon"
                  className="w-15 h-15 mt-1"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Commentaire:</span>
                  <span className="text-textSecoundary text-sm mt-1">
                    {pin.comment && pin.comment.trim() !== ""
                      ? pin.comment
                      : "Aucun commentaire"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;