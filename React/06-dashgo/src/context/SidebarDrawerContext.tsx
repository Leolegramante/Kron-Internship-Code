import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContex = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath]);

  return (
    <SidebarDrawerContex.Provider value={disclosure}>
      {children}
    </SidebarDrawerContex.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContex)