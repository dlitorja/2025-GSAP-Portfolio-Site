import * as prismic from '@prismicio/client'

// Site Settings Type (Singleton)
export interface SiteSettingsDocument {
  data: {
    site_title: prismic.KeyTextField
    hero_headline: prismic.KeyTextField
    hero_subtitle: prismic.KeyTextField
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
    homepage_background_image: prismic.ImageField
    homepage_background_video: prismic.LinkField
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
      caption?: prismic.KeyTextField
    }>
    technologies: Array<{
      name: prismic.KeyTextField
    }>
    projectLink: prismic.LinkField
    githubLink: prismic.LinkField
    date: prismic.DateField
    videoEmbed: prismic.EmbedField
    videoFile: prismic.LinkField
    additionalVideos: Array<{
      videoType?: prismic.SelectField
      videoEmbed?: prismic.EmbedField
      videoFile?: prismic.LinkField
      videoTitle?: prismic.KeyTextField
      videoDescription?: prismic.KeyTextField
    }>
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

// Gallery Type
export interface GalleryDocument {
  uid: string
  data: {
    title: prismic.KeyTextField
    description: prismic.RichTextField
    featuredImage: prismic.ImageField
    category?: prismic.SelectField
    date?: prismic.DateField
    location?: prismic.KeyTextField
    mediaType?: prismic.SelectField
    singleImage?: prismic.ImageField
    imageGallery?: Array<{
      image: prismic.ImageField
      caption?: prismic.KeyTextField
    }>
    singleVideo?: prismic.SelectField
    videoEmbed?: prismic.EmbedField
    videoFile?: prismic.LinkField
    videoGallery?: Array<{
      videoType?: prismic.SelectField
      videoEmbed?: prismic.EmbedField
      videoFile?: prismic.LinkField
      videoTitle?: prismic.KeyTextField
      videoDescription?: prismic.KeyTextField
      thumbnail?: prismic.ImageField
    }>
    tags?: Array<{
      tag: prismic.KeyTextField
    }>
  }
}

