const URLBACK = "https://api.axolo.co/"
import SignUpButton from "./signUpButton"

export const SignInUpButtons = () => {
  return (
    <div className="ml-4 hidden items-center justify-end md:flex ">
      <a
        href={`${URLBACK}signIn/slack`}
        target="_blank"
        rel="noreferrer"
        className="hidden whitespace-nowrap text-base font-medium text-black hover:text-secondaryGreen dark:text-textWhite lg:block"
      >
        Sign in
      </a>
      <SignUpButton />
    </div>
  )
}
