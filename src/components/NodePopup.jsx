import React, { useState, useEffect } from 'react';
import { Box, Input, Button, IconButton, CloseButton, Text, Flex } from '@chakra-ui/react';
import { DeleteIcon, CopyIcon } from '@chakra-ui/icons';

const NodeOptionsPopup = ({ nodeId, nodeLabel, onDelete, onUpdate, isOpen, onClose }) => {
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewLabel(nodeLabel); 
    }
  }, [isOpen, nodeLabel]);

  if (!isOpen) return null;

  return (
    <Box
      position="absolute"
      right="20px"
      top="20px"
      padding="20px"
      border="1px solid black"
      backgroundColor="white"
      borderRadius="md"
      boxShadow="md"
      zIndex="popover"
      width="300px"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">{nodeLabel}</Text>
        <Flex>
          <IconButton
            aria-label="Copy Node"
            icon={<CopyIcon />}
            size="sm"
            variant="ghost"
            mr={2}
          />
          <IconButton
            aria-label="Delete Node"
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(nodeId)}
            mr={2}
          />
          <CloseButton onClick={onClose} />
        </Flex>
      </Flex>
      <Input
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="Enter Name..."
        size="sm"
        mb={4}
      />
      <Flex justifyContent="flex-end">
        <Button size="sm" variant="outline" onClick={onClose} mr={2}>
          Cancel
        </Button>
        <Button size="sm" colorScheme="blue" onClick={() => onUpdate(nodeId, newLabel)}>
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default NodeOptionsPopup;