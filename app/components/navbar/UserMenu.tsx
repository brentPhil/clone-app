"use client"

import React from "react"
import { User } from "@prisma/client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModalStore from "@/app/hooks/useRegisterModal"
import useLoginModalStore from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import useRentModalStore from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"
interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModalStore()
  const loginModal = useLoginModalStore()
  const rentModal = useRentModalStore()
  const router = useRouter()

  const [IsOpen, setIsOpen] = React.useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100">
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 p-4 border rounded-full cursor-pointer md:py-1 md:px-2 border-neutral-200 hover:shadow-md trasition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {IsOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onclick={() => router.push(`/trips`)}
                  label="My trips"
                />
                <MenuItem
                  onclick={() => router.push(`/favorites`)}
                  label="My favorites"
                />
                <MenuItem
                  onclick={() => router.push(`/reservations`)}
                  label="My reservations"
                />
                <MenuItem
                  onclick={() => router.push(`/properties`)}
                  label="My properties"
                />
                <MenuItem onclick={rentModal.onOpen} label="Airbnb my home" />
                <MenuItem onclick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onclick={loginModal.onOpen} label="login" />
                <MenuItem onclick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
