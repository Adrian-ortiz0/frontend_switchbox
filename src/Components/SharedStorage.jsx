import React from 'react'
import { StorageAside } from './StorageAside'
import { StorageHeader } from './StorageHeader'
import { CloudProfile } from './CloudProfile'
import { SharedContainer } from './SharedContainer'

export const SharedStorage = () => {
  return (
    <main className='storage_menu-main'>
        <StorageAside />
        <section className="storage_menu-section">
            <StorageHeader />
            <div className='data_container'>
              <SharedContainer />
                <CloudProfile />
            </div>
        </section>
    </main>
  )
}
