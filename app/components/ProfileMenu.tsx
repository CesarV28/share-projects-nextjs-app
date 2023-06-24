"use client"

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import { SessionInterface } from "@/common.types";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
    // onMouse enter event
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flexCenter z-10 flex-col relative">
            <div>
                {/* Div para la imagen del perfil */}
                <div onMouseEnter={ () => setOpenModal(true) }>
                    {/* Agregar la imagen del usuario on un Image */}
                </div>
                <div className={ openModal ? '' : 'hidden' }>
                    <div className='profile_menu-items' onMouseLeave={ () => setOpenModal(false) }>
                        <div className="profile_menu-item">
                            <button type="button" className="text-sm" onClick={() => signOut()}> 
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu