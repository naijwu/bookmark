import Image from 'next/image';
import styles from './LinkItem.module.css'

export interface LinkItemProps {
    favicon?: string;
    title: string;
    url: string;
    dateAdded: string;
}

const LinkItem = ({
    favicon,
    title,
    url,
    dateAdded
}: LinkItemProps) => {

    return (
        <div className={styles.item}>
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
                    {url}
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
    )
}

export default LinkItem