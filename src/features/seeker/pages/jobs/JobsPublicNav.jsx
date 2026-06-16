import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../../../../components/ui/resizable-navbar";
import navItems from "../../../public/data/headerData.json";

const JobsPublicNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-[#FFF7F3]">
      <Navbar>
        <NavBody disableScrollResize>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              as={Link}
              to="/seeker/login"
              variant="secondary"
              className="rounded-[8px] border border-[#EADFD9] bg-white text-[#0A0A0A] hover:border-[#C6AFFF] hover:text-[#8500FA]"
            >
              Sign in
            </NavbarButton>
            <NavbarButton
              as={Link}
              to="/seeker/signup"
              variant="primary"
              className="rounded-[8px] bg-[#FF6B35] text-white hover:bg-[#FF9566]"
            >
              Start free
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav disableScrollResize>
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
                {item.link && (
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-[#6F6F76] transition hover:text-[#0A0A0A]"
                  >
                    {item.name}
                  </a>
                )}

                {item.children && (
                  <div className="flex flex-col gap-2">
                    <span className="py-2 font-medium text-[#0A0A0A]">
                      {item.name}
                    </span>
                    <div className="ml-4 flex flex-col gap-2">
                      {item.children.map((child, i) => (
                        <a
                          key={i}
                          href={child.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-[#6F6F76] transition hover:text-[#8500FA]"
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
                href="/seeker/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full rounded-[8px] border border-[#EADFD9] bg-white text-[#0A0A0A]"
              >
                Sign in
              </NavbarButton>
              <NavbarButton
                href="/seeker/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full rounded-[8px] bg-[#FF6B35] text-white"
              >
                Start free
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default JobsPublicNav;
