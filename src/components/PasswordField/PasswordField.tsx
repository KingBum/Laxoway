import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface PasswordFieldProps extends InputProps {
    label?: string; // Thêm prop label cho PasswordField
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }

    const { label, ...rest } = props; // Tách prop label ra khỏi props để sử dụng

    return (
        <FormControl>
            {label && <FormLabel htmlFor="password">{label}</FormLabel>} {/* Hiển thị label nếu được truyền vào */}
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="text"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...rest} // Sử dụng {...rest} để truyền các props khác vào Input
                />
            </InputGroup>
        </FormControl>
    )
})

PasswordField.displayName = 'PasswordField'
