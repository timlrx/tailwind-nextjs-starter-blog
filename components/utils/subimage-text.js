import classNames from "./classNames"

export const SubImageText = ({ classNameDiv = "", classNameText = "", children }) => {
  return (
    <div
      className={classNames(
        "mx-auto -mt-8 flex w-max !p-0 text-center text-xs",
        classNameDiv.length > 0 && classNameDiv
      )}
    >
      <span className={classNames("w-56 lg:w-[400px]", classNameText.length > 0 && classNameText)}>
        {children}
      </span>
    </div>
  )
}
