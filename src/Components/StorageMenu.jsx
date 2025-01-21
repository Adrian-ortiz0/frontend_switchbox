import React from 'react'
import { StorageAside } from './StorageAside'
import { StorageHeader } from './StorageHeader'
import { CloudContainer } from './CloudContainer'
import { CloudProfile } from './CloudProfile'

export const StorageMenu = () => {
  return (
    <main className='storage_menu-main'>
        <StorageAside />
        <section className='storage_menu-section'>
            <StorageHeader />
            <div className='data_container'>
                <CloudContainer />
                <CloudProfile />
            </div>
        </section>
    </main>
  )
}
