import React, { useState, useCallback, useMemo } from 'react';
import { Box } from "@chakra-ui/react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from 'uuid';
import { initialEdges, initialNodes } from "../utils/InitialTypes";
import AddNode from "./AddNode";
import CustomEdge from "./CustomEdge";
import SquareNode from "./Square";
import CircleNode from "./Circle";
import NodeOptionsPopup from "./NodePopup";

const GraphEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);  

  const onNodeSelect = useCallback((nodeId) => {
    setSelectedNodeId(nodeId);
    setIsPopupOpen(true);  
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);  
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    closePopup();  
  }, [setNodes, setEdges, closePopup]);

  const updateNodeLabel = useCallback((nodeId, newLabel) => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === nodeId) {
        return { ...node, data: { ...node.data, label: newLabel } };
      }
      return node;
    }));
    closePopup();  
  }, [setNodes, closePopup]);

  const onConnect = useCallback((connection) => {
    const edge = {
      ...connection,
      animated: true,
      id: uuidv4(),
      type: "customEdge",
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  }, [setEdges]);

  const nodeTypes = useMemo(() => ({
    square: (nodeProps) => <SquareNode {...nodeProps} onNodeSelect={onNodeSelect} onDelete={deleteNode} />,
    circle: (nodeProps) => <CircleNode {...nodeProps} onNodeSelect={onNodeSelect} onDelete={deleteNode} />,
    shapeSelector: AddNode,
  }), [onNodeSelect, deleteNode]);

  const edgeTypes = useMemo(() => ({
    customEdge: CustomEdge,
  }), []);

  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  return (
        <Box height={"700px"} width="900px" border="1px solid black">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
            {selectedNodeId && isPopupOpen && (
              <NodeOptionsPopup
                nodeId={selectedNodeId}
                nodeLabel={selectedNode?.data?.label || 'Node'}
                onDelete={deleteNode}
                onUpdate={updateNodeLabel}
                isOpen={isPopupOpen}
                onClose={closePopup}
              />
            )}
          </ReactFlowProvider>
        </Box>
      );
    };

export default GraphEditor;