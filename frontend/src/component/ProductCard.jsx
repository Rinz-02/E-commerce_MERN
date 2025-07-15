import { useProductstore } from '../store/product.js';
import { useColorModeValue } from '../components/ui/color-mode.jsx'
import { Box,Heading,HStack,Image,Text,Input } from '@chakra-ui/react'
import { Button, Dialog, Field, Portal, Stack } from "@chakra-ui/react"
import React, { useContext, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Toaster, toaster } from "../components/ui/toaster.jsx"


export default function ProductCard({products}) {

    const textColor = useColorModeValue('gray.600' , 'white')
    const {deleteProducts} = useProductstore();
    

    const handleDelete = async (pid) => {
      const{success,message} = await deleteProducts(pid);
      if(success){
        toaster.create({
          titile : "Success",
          type : "success",
          description : message, 
        })
      }else{
        toaster.create({
          titile : "Error",
          type : "error",
          description : message
        })
      }
    }
  return (
    <Box 
    shadow={'lg'}
    rounded={"lg"}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform : 'translateY(-5px)',shadow : 'xl'}}
    >
        <Image src={products.image} alt={products.name} h={48} w='full' objectFit={'cover'}/>
        <Box p={4} backgroundColor={useColorModeValue('gray.50','gray.600')}>
            <Box p={3} backgroundColor={useColorModeValue('gray.100','gray.500')} rounded={"xl"}> 
              <Heading as='h3' size={'lg'} mb='2' color={textColor} fontWeight={"bold"}>
              {products.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'md'} mb='4'color={'green.500'} >
              ${products.price}
            </Text> 
            <HStack gap={3}>
                 <div style={{fontSize : 20 , color : '#3badff'}}><UpdateIcon products={products}/></div>
                 <div style={{fontSize : 23 , color: '#eb676c'}} onClick={() => handleDelete(products._id)}><MdDeleteForever/></div>
                 <Toaster/>
            </HStack>
            </Box>
        </Box>

    </Box>
  )
}

const UpdateIcon = ({products}) => {
  const [updatedProduct,setupdatedProduct] = React.useState(products);
  const {updateProducts} = useProductstore();
  const handleUpdate = async(pid,updatedProduct) => {
      const {success,message} = await updateProducts(pid,updatedProduct);
    if(success){
      toaster.create({
        titile : "Success",
        type : "success",
        description : "Product Updated"
      })
    }else{
      toaster.create({
        titile : "Error",
        type : "error",
        description : "Fail"
      })
    }
  }
  return (
     <Dialog.Root >
      <Toaster/>
      <Dialog.Trigger asChild>
        <FaRegEdit />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input  onChange={(e) => setupdatedProduct({...updateProducts,name : e.target.value})} name='name' value={updatedProduct.name}/>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Price</Field.Label>
                  <Input  onChange={(e) => setupdatedProduct({...updateProducts,price : e.target.value})} name='price' value={updatedProduct.price}/>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Image URL</Field.Label>
                  <Input  onChange={(e) => setupdatedProduct({...updateProducts,image : e.target.value})} name='image' value={updatedProduct.image}/>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger >
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => handleUpdate(products._id,updatedProduct)}>Save</Button>
              </Dialog.ActionTrigger>
              
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
