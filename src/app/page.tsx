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
    let linkPreview: any = {}
    
    try {
      const response = await fetch(`http://api.linkpreview.net/?key=${API_KEY_TO_USE}&q=${encodeURI(link)}`);
      linkPreview = await response.json();
    } catch (error) {
      console.error(error)
      setLoading(false)
      return
    }

    if (!linkPreview?.title) {
      setLoading(false)
      return
    }

    // update links
    const updatedLinks = JSON.parse(JSON.stringify(links))
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
    updatedLinks.splice(0, 0, {
      favicon: linkPreview.image,
      title: linkPreview.title,
      link: linkPreview.url.replace(domainRegex, '$1').slice(0, -1),
      url: linkPreview.url,
      dateAdded: (new Date()).toString().substring(4, 15)
    })
    setLinks(updatedLinks)
    
    // save links data
    window.sessionStorage.setItem('bookmarks', JSON.stringify(updatedLinks))

    console.log(updatedLinks)
    setLoading(false)
  }

  function handleDelete(index: number) {
    const updatedLinks = JSON.parse(JSON.stringify(links))
    updatedLinks.splice(index, 1)
    setLinks(updatedLinks)
    window.sessionStorage.setItem('bookmarks', JSON.stringify(updatedLinks))
  }

  return (
    <div className={styles.container}>
      <LinkField handleAddLink={handleAddLink} loading={loading} />
      <div className={styles.links}>
        {links?.map((link, index) => <LinkItem key={index} index={index} handleDelete={handleDelete} {...link} />)}
      </div>
    </div>
  )
}
