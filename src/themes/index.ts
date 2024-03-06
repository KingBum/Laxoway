import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react"

const Button: ComponentStyleConfig = {
    variants: {
        'primary': {
            bg: '#FA7436',
            borderRadius: "8px",
            color: "#FEFCFB",
            fontWeight: 'bold',
            padding: "15px 25px",
            fontSize: "16px",
        },
        'outline': {
            borderRadius: "5px",
            color: "#FA7436",
            fontWeight: 'bold',
            padding: "12px 36px",
            border: "1px solid rgba(254,223,86,.6) !important",
        },
    }
}

const components = {
    Button
}


const colors = {
    colors: {
        text: '#222222',
        subText: "#666666",
        primary: '#FA7436',
        secondary: '#FFAA88',
        bg: "#FDE5DE",
    },
    
}

const theme = extendTheme({
    colors,
    components,
})

export default theme