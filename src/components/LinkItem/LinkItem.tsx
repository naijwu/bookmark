'use client';

import Image from 'next/image';
import styles from './LinkItem.module.css'
import { useState } from 'react';
import OutsideAlerter from '@/app/utils/OutsideAlerter';

export interface LinkItemProps {
    handleDelete?: (arg0: number) => void;
    index?: number;
    favicon?: string;
    title: string;
    link: string;
    url: string;
    dateAdded: string;
}

const LinkItem = ({
    handleDelete,
    index,
    favicon,
    title,
    link,
    url,
    dateAdded
}: LinkItemProps) => {

    const [deleting, setDeleting] = useState<boolean>(false)

    function handleRightClick(e: any) {
        if (deleting) {
            if (handleDelete) {
                handleDelete(index as number)
            }
            setDeleting(false)
        } else {
            setDeleting(true)
        }
        e.preventDefault();
        return false
    }

    function addHttps(url: string) {
        // Check if the URL already starts with http:// or https://
        if (!/^https?:\/\//i.test(url)) {
          // Add https:// to the URL
          url = 'https://' + url;
        }
        
        return url;
      }

    return (
        <OutsideAlerter onClickOutside={()=>setDeleting(false)}>
            <a className={styles.normalize} href={addHttps(url)} target="_blank" rel="noreferrer noopener">
                <div className={`${styles.item} ${deleting ? styles.deleting : ''}`} onContextMenu={handleRightClick}>
                    <div className={styles.left}>
                        <div className={styles.faviconContainer}>
                            {(favicon && favicon != '') ? (
                                <Image src={favicon} alt={title} fill unoptimized />
                            ) : (
                                <div className={styles.faviconPlaceholder}>
                                    {title?.substring(0, 1) || ''}
                                </div>
                            )}
                        </div>
                        <div className={styles.title}>
                            {title}
                        </div>
                        <div className={styles.url}>
                            {link}
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.dateAdded}>
                            {dateAdded}
                        </div>
                        <div className={styles.categories}>

                        </div>
                    </div>
                </div>
            </a>
        </OutsideAlerter>
    )
}

export default LinkItem