import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import CustomHandle from './CustomHandle';
import { X } from "react-bootstrap-icons";

export default function CircleNode({ id, data, onNodeSelect, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: 'lightgreen',
        border: '1px solid black',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: isHovered ? 'pointer' : 'grab'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation(); 
        onNodeSelect(id);
      }}
    >
      {isHovered && (
        <div 
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            cursor: 'pointer',
            color: 'red',
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.5)'
          }}
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(id);
          }}
        >
          <X size={14} />
        </div>
      )}
      <CustomHandle type="target" position={Position.Top} />
      <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{data.label}</div>
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
}