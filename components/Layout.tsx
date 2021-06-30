import React, { ReactNode } from "react";
import Head from 'next/head'

import Header from "./Header";

interface LayoutProps {
  title?: string
  keywords?: string
  description?: string
  children: ReactNode
}

export default function Layout({ title = 'Default title', keywords = 'Default keywords', description = 'Default description', children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Head>

      <Header />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  )
}
