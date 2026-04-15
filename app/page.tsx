'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroCarousel from '@/components/home/HeroCarousel'
import ImpactCalculator from '@/components/home/ImpactCalculator'
import MissionSection from '@/components/home/MissionSection'
import FounderSection from '@/components/home/FounderSection'
import MyContribution from '@/components/home/MyContribution'
import DonationModal from '@/components/donation/DonationModal'

export default function HomePage() {
  const [donationOpen, setDonationOpen] = useState(false)
  const [presetAmount, setPresetAmount] = useState<number | undefined>(undefined)

  const openDonation = (amount?: number) => {
    setPresetAmount(amount)
    setDonationOpen(true)
  }

  return (
    <>
      <Navbar onDonateClick={() => openDonation()} />
      <main>
        <HeroCarousel onDonateClick={() => openDonation()} />
        <ImpactCalculator onDonateClick={openDonation} />
        <MissionSection />
        <FounderSection />
        <MyContribution />
      </main>
      <Footer />
      <DonationModal
        isOpen={donationOpen}
        onClose={() => setDonationOpen(false)}
        initialAmount={presetAmount}
      />
    </>
  )
}
