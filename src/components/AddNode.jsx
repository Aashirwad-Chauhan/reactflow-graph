import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronBarDown } from "react-bootstrap-icons";
import { useReactFlow } from "reactflow";
import { v4 as uuidv4 } from 'uuid';

const NODE_SHAPES = [
  { shape: "square", label: "Square Node" },
  { shape: "circle", label: "Circle Node" },
];

export default function PaymentProviderSelect() {
  const { setNodes } = useReactFlow();

  const onShapeClick = (shapeInfo) => {
    const location = Math.random() * 500;

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: uuidv4(),     //        id: `${prevNodes.length + 1}`,
        data: { label: shapeInfo.label },
        type: shapeInfo.shape, // 'square' or 'circle'
        position: { x: location, y: location },
      },
    ]);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronBarDown />}>
        Create Node 
      </MenuButton>
      <MenuList>
        {NODE_SHAPES.map((shape) => (
          <MenuItem key={shape.shape} onClick={() => onShapeClick(shape)}>
            {shape.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}