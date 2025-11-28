import { BannerHome } from '@/pages/app/home/banner-home'
import { ContentHome } from '@/pages/app/home/content-home'

export function Home() {
  return (
    <div className="mx-auto max-w-[1250px] px-5">
      <BannerHome />

      <ContentHome />
    </div>
  )
}
