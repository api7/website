import { useDisclosure } from '@chakra-ui/hooks'
import { isFocusable, isRightClick, getOwnerDocument } from '@chakra-ui/utils'
import * as React from 'react'

const getTarget = (event: React.FocusEvent) =>
  (event.relatedTarget || document.activeElement) as HTMLElement

export function useNavMenu() {
  const { isOpen, onClose, onToggle, onOpen } = useDisclosure()
  const menuRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const timeoutRef = React.useRef<any>()

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const focusMenu = () => {
    timeoutRef.current = setTimeout(() => {
      menuRef.current?.focus({ preventScroll: true })
    }, 100)
  }

  const getTriggerProps = () => {
    const triggerProps: React.ComponentProps<'button'> = {
      ref: buttonRef,
      'aria-expanded': isOpen,
      'aria-controls': 'menu',
      'aria-haspopup': 'true',
    }

    triggerProps.onClick = (event: React.MouseEvent) => {
      if (isRightClick(event)) return
      onToggle()
      if (!isOpen) {
        focusMenu()
      }
    }

    triggerProps.onBlur = (event: React.FocusEvent) => {
      const target = getTarget(event)
      if (isOpen && !menuRef.current?.contains(target)) {
        onClose()
      }
    }

    triggerProps.onKeyDown = (event: React.KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose()
        buttonRef.current?.focus({ preventScroll: true })
      }

      if (event.key === 'ArrowDown') {
        if (!isOpen) onOpen()
        focusMenu()
      }
    }

    return triggerProps as any
  }

  const getMenuProps = () => {
    const menuProps: React.ComponentProps<'div'> = {
      ref: menuRef,
      id: 'menu',
      tabIndex: -1,
    }

    menuProps.onKeyDown = (event: React.KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape': {
          onClose()
          return buttonRef.current?.focus()
        }
        case 'ArrowDown': {
          const doc = getOwnerDocument(menuRef.current)
          const next = doc?.activeElement?.nextElementSibling as HTMLAnchorElement | null
          return next?.focus()
        }
        case 'ArrowUp': {
          const doc = getOwnerDocument(menuRef.current)
          const prev = doc?.activeElement?.previousElementSibling as HTMLAnchorElement | null
          const el = (prev ?? buttonRef.current) as HTMLButtonElement
          return el.focus()
        }
        default:
          break
      }
    }

    menuProps.onBlur = (event: React.FocusEvent) => {
      const target = getTarget(event)
      const shouldBlur =
        isOpen && !target.isSameNode(buttonRef.current) && !menuRef.current?.contains(target)
      if (shouldBlur) {
        onClose()
        if (!isFocusable(target)) {
          buttonRef.current?.focus({ preventScroll: true })
        }
      }
    }

    return menuProps as any
  }

  return {
    isOpen,
    onClose,
    getTriggerProps,
    getMenuProps,
  }
}
