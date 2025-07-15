import { cartContext } from "../context/CartProvider.jsx";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { authContext } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Toaster,toaster } from "../components/ui/toaster.jsx";

export default function HomeProductCard({ products }) {
  const {add} = useContext(cartContext);
  const {authenticated}= useContext(authContext);
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.300");

  const onClick = () => {
    add(products);
    if(!authenticated){
      toaster.create({
                type: "info",
                description : "You need to login first"
              })
      navigate('/login')
    }
  }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={products.image}
        alt={products.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4} backgroundColor={useColorModeValue("gray.50", "gray.600")}>
        <Box
          p={3}
          backgroundColor={useColorModeValue("gray.200", "gray.500")}
          rounded={"xl"}
        >
          <Heading
            as="h1"
            size={"lg"}
            fontWeight={"bold"}
            mb="2"
            color={textColor}
          >
            {products.name}
          </Heading>
          <Text fontWeight={"bold"} fontSize={"md"} mb="4" color={"green.500"}>
            ${products.price}
          </Text>
          <Box
            gap={3}
            p={2}
            rounded={"lg"}
            color={textColor}
            fontWeight={'bold'}
            backgroundColor={useColorModeValue("blue.300", "blue.400")}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
          >
            <button className="flex justify-center w-full" onClick={onClick}>Add To Cart</button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
