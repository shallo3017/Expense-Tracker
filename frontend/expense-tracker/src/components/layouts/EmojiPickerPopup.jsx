import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX, LuTrash2 } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveIcon = () => {
    onSelect(""); // Clear the icon
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
      <div className="flex items-center gap-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white text-primary rounded-lg">
            {icon ? (
              <img src={icon} alt="Icon" className="w-12 h-12" />
            ) : (
              <LuImage />
            )}
          </div>
          <p className="ml-6">{icon ? "Change Icon" : "Pick Icon"}</p>
        </div>

        {icon && (
          <button
            className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            onClick={handleRemoveIcon}
            title="Remove Icon"
          >
            <LuTrash2 size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-0 left-0 z-50">
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer shadow-md"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || "");
              setIsOpen(false); // Close picker after selection
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
