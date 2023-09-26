/* eslint-disable react/display-name */
import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import Image from "./Image"
import CustomLink from "./Link"
import TOCInline from "./TOCInline"
import Pre from "./Pre"
import { BlogNewsletterForm } from "./NewsletterForm"
import CTABanner from "./CTABanner/templateBanner"
import AddToSlack from "./CTABanner/addToSlack"
import { ImageContainer, Callout, YellowCalloutBox } from "./utils/image-article"
import G2Banner from "./utils/g2Banner"
import { NoFollowLink } from "./utils/nofollow-link"
import EnterpriseEmailInput from "./EnterpriseEmailInput"
import { SubImageText } from "./utils/subimage-text"
import UserReview from "./userReviews/index"
import TopGuestBanner from "./topGuestBanner/index"

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
  EnterpriseEmailInput,
  CTABanner,
  AddToSlack,
  ImageContainer,
  Callout,
  YellowCalloutBox,
  SubImageText,
  NoFollowLink,
  G2Banner,
  UserReview,
  TopGuestBanner,
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
