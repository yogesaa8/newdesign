"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../../components/ui/resizable-navbar";

import { useState } from "react";
import BackgroundLinesDemo from "./background-lines-demo";
import { Link } from "react-router-dom";
import navItems from "../data/headerData.json";

export function NavbarDemo() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-[#fff7f3]">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton as={Link} to="/job-seeker/login" variant="secondary">
              Login
            </NavbarButton>
            <NavbarButton as={Link} to="/job-seeker/signup" variant="primary">
              Sign Up
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <div key={`mobile-link-${idx}`} className="w-full">
                {/* Normal Link */}
                {item.link && (
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-on-surface-variant dark:text-surface-container-low"
                  >
                    {item.name}
                  </a>
                )}

                {/* Services / Dropdown Items */}
                {item.children && (
                  <div className="flex flex-col gap-2">
                    <span className="py-2 font-medium text-on-surface dark:text-surface-container-low">
                      {item.name}
                    </span>

                    <div className="ml-4 flex flex-col gap-2">
                      {item.children.map((child, i) => (
                        <a
                          key={i}
                          href={child.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-outline"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="/job-seeker/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>

              <NavbarButton
                href="/job-seeker/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <BackgroundLinesDemo />
      {/* Navbar */}
    </div>
  );
}
