import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photos | Gallery',
  description: 'A collection of photography work',
}

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

