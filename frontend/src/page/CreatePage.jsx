import { Container, Heading, VStack,Box, Input,Button } from '@chakra-ui/react';
import { useColorMode,useColorModeValue } from '../components/ui/color-mode.jsx';
import React from 'react'
import {useProductstore} from '../store/product.js';
import { Toaster, toaster } from "../components/ui/toaster.jsx"


export default function CreatePage() {
  const [newProduct,setNewProduct] = React.useState({
    name : "",
    price : "",
    image : ""
  });

  const {createProduct} = useProductstore();
  const handleAddProduct = async() => {
     const {success , message} = await createProduct(newProduct);
      if(success){
        toaster.create({
          title : "Success",
          description : message,
          type : "success"
        })
         
      }else{
        toaster.create({
                title: "Error",
                description : message,
                type : "error"
              })
      }
      setNewProduct({name : "",price : "",image : ""})
     
     }
  
  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'4xl'} textAlign={'center'} mb={8} color={useColorModeValue('purple.500','cyan.400')} fontFamily={'cursive'}>
          Create New Product
        </Heading>
        <Box w={'60%'} backgroundColor={useColorModeValue('white.100','gray.800')} rounded={'lg'} shadow={'md'} padding={4}>
          <VStack spacing={6}  gapY={3}>
            <Input 
            placeholder='Name'
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name : e.target.value})}
            padding={6}
            backgroundColor={useColorModeValue('white','gray.900')}
            />
            <Input
            placeholder='Price'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price : e.target.value})}
            padding={6}
            backgroundColor={useColorModeValue('white','gray.900')}
            />
            <Input
            placeholder='Image URL'
            name='image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image : e.target.value})}
            padding={6}
            backgroundColor={useColorModeValue('white','gray.900')}
            />
            <Button backgroundColor={'blue.400'} w={'full'} onClick={handleAddProduct}>
              <Toaster />
              AddProuduct
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}


