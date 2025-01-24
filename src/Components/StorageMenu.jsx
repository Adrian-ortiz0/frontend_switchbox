import React from 'react'
import { StorageAside } from './StorageAside'
import { CloudContainer } from './CloudContainer'
import { CloudProfile } from './CloudProfile'
import { StorageHeaderFolder } from './StorageHeaderFolder'
import { useParams } from 'react-router'

export const StorageMenu = () => {
  const {id} = useParams();
  return (
    <main className='storage_menu-main'>
        <StorageAside />
        <section className='storage_menu-section'>
            <StorageHeaderFolder carpetaId={id} />
            <div className='data_container'>
                <CloudContainer />
                <CloudProfile />
            </div>
        </section>
    </main>
  )
}
