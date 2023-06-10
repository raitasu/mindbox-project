import {  Flex, Link } from "@chakra-ui/react"

export const Header = () => {
    return (
        <Flex borderBottom='1px solid gray' height='100px' bg='#37C53A' justifyContent='flex-start' alignItems='center'>
            <Link fontFamily='Sriracha' pl='50px' fontSize='40px' href='https://mindbox.ru/' isExternal _hover={{color: 'white'}}>MINDBOX</Link>
        </Flex>
    )
}