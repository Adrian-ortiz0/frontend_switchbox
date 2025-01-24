import React from 'react'
import { StorageAside } from './StorageAside'
import { CloudProfile } from './CloudProfile'
import { SharedContainer } from './SharedContainer'
import { SharedHeader } from './SharedHeader'

export const SharedStorage = () => {
  return (
    <main className='storage_menu-main'>
        <StorageAside />
        <section className="storage_menu-section">
            <SharedHeader />
            <div className='data_container'>
              <SharedContainer />
                <CloudProfile />
            </div>
        </section>
    </main>
  )
}
