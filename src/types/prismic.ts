import * as prismic from '@prismicio/client'

// Site Settings Type (Singleton)
export interface SiteSettingsDocument {
  data: {
    site_title: prismic.KeyTextField
    hero_headline: prismic.KeyTextField
    hero_description: prismic.KeyTextField
    announcement_badge: prismic.KeyTextField
    show_announcement: prismic.BooleanField
    meta_title: prismic.KeyTextField
    meta_description: prismic.KeyTextField
    meta_keywords: prismic.KeyTextField
    og_image: prismic.ImageField
    github_url: prismic.LinkField
    linkedin_url: prismic.LinkField
    twitter_url: prismic.LinkField
    instagram_url: prismic.LinkField
    footer_text: prismic.KeyTextField
    footer_tagline: prismic.KeyTextField
  }
}

// Project Type
export interface ProjectDocument {
  uid: string
  data: {
    title: prismic.KeyTextField
    description: prismic.RichTextField
    featuredImage: prismic.ImageField
    gallery: Array<{
      image: prismic.ImageField
    }>
    technologies: Array<{
      name: prismic.KeyTextField
    }>
    projectLink: prismic.LinkField
    githubLink: prismic.LinkField
    date: prismic.DateField
    videoEmbed: prismic.EmbedField
    content: prismic.RichTextField
  }
}

// Blog Post Type
export interface BlogPostDocument {
  uid: string
  data: {
    title: prismic.KeyTextField
    excerpt: prismic.RichTextField
    featuredImage: prismic.ImageField
    author: prismic.KeyTextField
    publishDate: prismic.DateField
    tags: Array<{
      tag: prismic.KeyTextField
    }>
    content: prismic.RichTextField
    videoEmbed: prismic.EmbedField
  }
}

// About Type
export interface AboutDocument {
  data: {
    name: prismic.KeyTextField
    role: prismic.KeyTextField
    bio: prismic.RichTextField
    profileImage: prismic.ImageField
    skills: Array<{
      title: prismic.KeyTextField
      description: prismic.KeyTextField
    }>
    experience: Array<{
      title: prismic.KeyTextField
      company: prismic.KeyTextField
      dates: prismic.KeyTextField
      description: prismic.RichTextField
    }>
    socialLinks: Array<{
      platform: prismic.KeyTextField
      url: prismic.LinkField
    }>
    resumeLink: prismic.LinkField
  }
}

