import React, { useEffect } from 'react'
import { Container, VStack,Text, SimpleGrid } from '@chakra-ui/react'
import { LinearGradient } from 'react-text-gradients'
import { Link } from 'react-router-dom'
import { useProductstore } from '../store/product.js'
import ProductCard from '../component/ProductCard.jsx'

export default function HomePage() {

  const {fetchProducts,products} = useProductstore();
  useEffect(() => {
    fetchProducts();
    console.log("products",products);
  },[fetchProducts]);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
        <Text fontWeight={'bold'} fontSize={'2xl'} py={8}>
          <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
                  Current Products 🚀          
        </LinearGradient>
        </Text>

        <SimpleGrid columns={[2, null, 3]} gap={'30px'} w={'80%'}>
            {products.map((products) => (
              <ProductCard key={products._id} products={products}/>
            ))}
        </SimpleGrid>

        {products.length === 0 && <Text spaceX={5}>
          No Product Found <span>🛰️</span>
          <Text as='span' _hover={{textDecoration : 'underline'}} color={'blue.400'}> 
            <Link to={'/create'}>
            create new product
            </Link>
          </Text>
        </Text>}

      </VStack>
    </Container>
  )
}
