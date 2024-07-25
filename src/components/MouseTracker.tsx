import React, { useRef, useEffect, useState } from "react";

// Define the shape of the state that holds the mouse position
interface useStatePosition {
  x: number;
  y: number;
}

// Define the props that the MouseTracker component accepts
interface ComponentProps {
  children: React.ReactNode; // Allow any valid React children (elements, components, etc.)
}

const MouseTracker: React.FC<ComponentProps> = ({ children }) => {
  // Reference to the div element for direct DOM manipulation
  const divRef = useRef<HTMLDivElement>(null);

  // State to hold the current mouse position
  const [position, setPosition] = useState<useStatePosition>({ x: 0, y: 0 });

  // Event handler for mouse movement
  const handleMouseMovement = (event: MouseEvent) => {
    // Check if the div reference is available
    if (divRef.current) {
      // Get the position of the div relative to the viewport
      const rect = divRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the div
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Update state with the new mouse position
      setPosition({ x, y });
    }
  };

  // Effect hook to set up and clean up event listeners
  useEffect(() => {
    const div = divRef.current;
    if (div) {
      // Add event listeners for mouse movement and enter events
      div.addEventListener("mousemove", handleMouseMovement);
      div.addEventListener("mouseenter", handleMouseMovement); // Capture initial position when mouse enters
    }

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      if (div) {
        div.removeEventListener("mousemove", handleMouseMovement);
        div.removeEventListener("mouseenter", handleMouseMovement);
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

  // Calculate CSS transform based on mouse position
  const calcTransform = () => {
    if (!divRef.current) {
      // Default transform if div is not available
      return { transform: "perspective(500px) rotateX(0deg) rotateY(0deg)" };
    }
    // Get the center of the div
    const centerX = divRef.current.offsetWidth / 2;
    const centerY = divRef.current.offsetHeight / 2;
    // Calculate how far the mouse position is from the center
    const deltaX = position.x - centerX;
    const deltaY = position.y - centerY;
    // Calculate rotation angles based on mouse position
    const rotateX = (deltaY / centerY) * 7; // Adjust the value for desired effect
    const rotateY = (deltaX / centerX) * -7; // Adjust the value for desired effect

    // Return the transform style object
    return {
      transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    };
  };

  return (
    // Apply calculated transform style and attach ref to div
    <div style={calcTransform()} ref={divRef}>
      {children} {/* Render child components or elements */}
    </div>
  );
};

export default MouseTracker; // Export the MouseTracker component for use in other parts of the application
