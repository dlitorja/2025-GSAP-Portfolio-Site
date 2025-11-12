import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for collaborations, freelance work, or just to say hi',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

