import React from 'react'
import styles from './surveysPage.module.css'

const SurveysPage = () => {
  return (
    <div className='text-white'>
      <h1 className={styles.title}>Surveys</h1>
      <div className={styles.content}>
        <p className={styles.subgreen}>
          These surveys are for Christians for a few good purposes:
        </p>

        <li>To start some meaningful conversations on faith.</li>
        <li>To see how we do and think.</li>
        <li>To make you check if the Bible really tells you so.</li>
        <li>To help one another be fresh and living testimony of Jesus.</li>
        <li>To maintain the God given oneness of the Spirit.</li>

        <p className={styles.subred}>These surveys are NOT INTENDED:</p>
        <li>To fight for denominational doctrines.</li>
        <li>To cause divisions.</li>
        <li>To slander anyone.</li>
      </div>
    </div>
  )
}

export default SurveysPage
