import siteMetadata from "@/data/siteMetadata"
import headerNavLinks from "@/data/headerNavLinks"
import Logo from "@/data/logo.svg"
import Link from "./Link"
import SectionContainer from "./SectionContainer"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ThemeSwitch from "./ThemeSwitch"
import Image from "next/image"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { SignInUpButtons } from "./signInUpButtons"
import TopBanner from "./topBanner"

const LayoutWrapper = ({ children }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <SectionContainer>
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900">
        {/* <TopBanner /> */}
        <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {/* <div className="mr-3">
                  <Logo />
                </div> */}
                <Image
                  width={3798 / 20}
                  height={840 / 20}
                  src="/blog/static/images/axolo/logo_axolo.png"
                  alt="logo Axolo"
                  // className="rounded-full"
                />
                {/* {typeof siteMetadata.headerTitle[locale] === "string" ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle[locale]}
                  </div>
                ) : (
                  siteMetadata.headerTitle[locale]
                )} */}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            {/* <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {t(`headerNavLinks:${link.title.toLowerCase()}`)}{" "}
                </Link>
              ))}
            </div> */}
            <select
              onChange={changeLanguage}
              defaultValue={locale}
              style={{ textAlignLast: "center" }}
              className="text-shadow-sm bg-transparent text-sm tracking-wide text-gray-900 dark:text-gray-100"
            >
              {locales.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
            <ThemeSwitch />
            <SignInUpButtons />
            <MobileNav />
          </div>
        </header>
      </div>
      <main className="mb-auto">{children}</main>
      <Footer />
    </SectionContainer>
  )
}

export default LayoutWrapper
