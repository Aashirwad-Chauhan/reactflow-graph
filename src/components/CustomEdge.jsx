import { IconButton } from "@chakra-ui/react";
import React from "react";
import { X } from "react-bootstrap-icons";
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Define the arrow marker
  const arrowMarker = (
    <defs>
      <marker
        id="arrow"
        markerWidth="10"
        markerHeight="10"
        refX="9" // This sets the arrow's position relative to the end of the line
        refY="3"
        orient="auto-start-reverse"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#000" />
      </marker>
    </defs>
  );

  return (
    <>
      {arrowMarker}
      <BezierEdge
        {...props}
        markerEnd="url(#arrow)" // Apply the defined arrow marker to the end of the edge
      />
      <EdgeLabelRenderer>
        <IconButton
          aria-label="Delete Edge"
          pos="absolute"
          icon={<X />}
          color="red"
          transform={`translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`}
          pointerEvents="all"
          bg="transparent"
          size="small"
          onClick={() =>
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
          }
        />
      </EdgeLabelRenderer>
    </>
  );
}