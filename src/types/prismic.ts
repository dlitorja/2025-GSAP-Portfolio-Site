import * as prismic from '@prismicio/client'

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

