'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, Fragment } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { US, IN, DE, FR, NL } from 'country-flag-icons/react/3x2';

const LANGS = [
  { code: 'en', label: 'English', Flag: US },
  { code: 'hi', label: 'हिंदी', Flag: IN },
  { code: 'de', label: 'Deutsch', Flag: DE },
  { code: 'fr', label: 'Français', Flag: FR },
  { code: 'nl', label: 'Nederlands', Flag: NL },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(LANGS[0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (scrolled: boolean) =>
    `text-sm font-medium transition ${
      scrolled ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-300'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent backdrop-blur-lg'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Green-logo.jfif" alt="Logo" width={42} height={42} className="rounded" />
            <span
              className={`font-bold tracking-wide text-lg ${isScrolled ? 'text-black' : 'text-white'}`}
            >
              GAJKESARI
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={navLinkClass(isScrolled)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <Listbox value={lang} onChange={setLang}>
              <div className="relative">
                <Listbox.Button
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm border border-transparent transition ${
                    isScrolled ? 'text-black' : 'text-white'
                  }`}
                  aria-label="Select Language"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white">
                    <lang.Flag className="w-full h-full object-contain" />
                  </div>
                  <span className="hidden md:inline">{lang.label}</span>
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white shadow-lg py-1 text-base z-50">
                    {LANGS.map((l) => {
                      const FlagIcon = l.Flag; // Capitalize component
                      return (
                        <Listbox.Option
                          key={l.code}
                          value={l}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 flex items-center gap-2 ${
                              active ? 'bg-amber-100' : ''
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <div className="w-4 h-56rounded-full overflow-hidden flex items-center justify-center bg-white">
                                <FlagIcon className="w-full h-full object-contain" />
                              </div>
                              <span
                                className={`${selected ? 'font-semibold' : 'font-normal'} text-black`}
                              >
                                {l.label}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {/* Login Button */}
            <Link
              href="/login"
              className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                isScrolled
                  ? 'text-black bg-amber-50 hover:bg-amber-100'
                  : 'text-white bg-white/10 hover:bg-white/20'
              }`}
            >
              <LogIn size={16} />
              Login
            </Link>

            {/* Mobile Menu */}
            <button className="md:hidden" onClick={() => setIsOpen(true)} aria-label="Open Menu">
              <Menu size={28} className={isScrolled ? 'text-black' : 'text-white'} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition transform duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition transform duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              className="absolute right-0 top-0 h-full w-64 bg-white p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close Menu"
                className="text-black mb-6"
                onClick={() => setIsOpen(false)}
              >
                <X size={28} />
              </button>

              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-black font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}

                <Link
                  href="/login"
                  className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-amber-500 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}
