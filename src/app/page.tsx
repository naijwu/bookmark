'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import LinkField from '@/components/LinkField/LinkField'
import LinkItem, { LinkItemProps } from '@/components/LinkItem/LinkItem';

const API_KEY_TO_USE = process.env.NEXT_PUBLIC_LINK_API

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false)
  const [links, setLinks] = useState<LinkItemProps[]>([])

  useEffect(() => {
    if (typeof window !== undefined) {
      const bookmarks = window?.sessionStorage.getItem('bookmarks')
      setLinks(bookmarks ? JSON.parse(bookmarks) : [])
    }
  }, [])

  async function handleAddLink(link: string) {
    if(loading) return
    if(!link) return
    setLoading(true)

    // get data of link
    const response = await fetch(`http://api.linkpreview.net/?key=${API_KEY_TO_USE}&q=${encodeURI(link)}`);
    const linkPreview = await response.json();

    // update links
    const updatedLinks = JSON.parse(JSON.stringify(links))
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
    updatedLinks.splice(0, 0, {
      favicon: linkPreview.image,
      title: linkPreview.title,
      url: linkPreview.url.replace(domainRegex, '$1').slice(0, -1),
      dateAdded: (new Date()).toString().substring(4, 15)
    })
    setLinks(updatedLinks)
    
    // save links data
    if (typeof window != undefined) {
      window.sessionStorage.setItem('bookmarks', JSON.stringify(updatedLinks))
    }

    console.log(updatedLinks)
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <LinkField handleAddLink={handleAddLink} loading={loading} />
      <div className={styles.links}>
        {links?.map((link, index) => <LinkItem key={index} {...link} />)}
      </div>
    </div>
  )
}
